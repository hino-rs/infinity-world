use std::sync::Arc;

use winit::window::Window;

use crate::{camera::{Camera, CameraGpu}, fps::FpsCounter, pipeline::PipelineRegistry, render_info::RenderInfo, terrain::Terrain};

use wgpu_text::{
    TextBrush,
    glyph_brush::{Section as TextSection, Text, ab_glyph::FontArc},
};

pub struct GpuContext {
    pub surface: wgpu::Surface<'static>,
    pub device: wgpu::Device,
    pub queue: wgpu::Queue,
    pub config: wgpu::SurfaceConfiguration,
}

impl GpuContext {
    pub async fn new(window: Arc<Window>) -> Self {
        let size = window.inner_size();

        let instance = wgpu::Instance::new(wgpu::InstanceDescriptor {
            backends: wgpu::Backends::all(),
            flags: wgpu::InstanceFlags::default(),
            backend_options: wgpu::BackendOptions::default(),
            display: None,
            memory_budget_thresholds: wgpu::MemoryBudgetThresholds::default(),
        });

        let surface = instance.create_surface(window).unwrap();

        let adapter = instance
            .request_adapter(&wgpu::RequestAdapterOptions {
                power_preference: wgpu::PowerPreference::default(),
                compatible_surface: Some(&surface),
                force_fallback_adapter: false,
            })
            .await
            .unwrap();

        let (device, queue) = adapter
            .request_device(&wgpu::DeviceDescriptor {
                label: None,
                required_features: wgpu::Features::empty(),
                required_limits: wgpu::Limits::default(),
                memory_hints: Default::default(),
                trace: wgpu::Trace::Off,
                experimental_features: wgpu::ExperimentalFeatures::disabled(),
            })
            .await
            .unwrap();

        let surface_caps = surface.get_capabilities(&adapter);
        let surface_format = surface_caps.formats[0];

        let config = wgpu::SurfaceConfiguration {
            usage: wgpu::TextureUsages::RENDER_ATTACHMENT,
            format: surface_format,
            width: size.width,
            height: size.height,
            present_mode: wgpu::PresentMode::AutoVsync,
            alpha_mode: surface_caps.alpha_modes[0],
            view_formats: vec![],
            desired_maximum_frame_latency: 2,
        };
        surface.configure(&device, &config);

        Self {
            surface,
            device,
            queue,
            config,
        }
    }

    pub fn resize(
        &mut self, 
        new_size: winit::dpi::PhysicalSize<u32>,
        render_info: &mut RenderInfo,
    ) {
        if new_size.width > 0 && new_size.height > 0 {
            self.config.width = new_size.width;
            self.config.height = new_size.height;
            // サーフェス（描画ウィンドウ）のサイズ再設定
            self.surface.configure(&self.device, &self.config);
            // テキストブラシにプロジェクションサイズ変更を通知
            // self.brush
            //     .resize_view(new_size.width as f32, new_size.height as f32, &self.queue);
            // ウィンドウサイズに応じた大きさで深度テクスチャを再生成
            let (depth_texture, depth_view) =
                RenderInfo::create_depth_texture(&self.device, &self.config);
            render_info.depth_texture = depth_texture;
            render_info.depth_view = depth_view;

            // カラーテクスチャを再生成
            let (color_texture, color_view) =
                RenderInfo::create_color_texture(&self.device, &self.config);
            render_info.color_texture = color_texture;
            render_info.color_view = color_view;
        }
    }

    pub fn render(
        &self, 
        render_info: &RenderInfo,
        pipelines: &PipelineRegistry,
        camera_gpu: &CameraGpu,
        terrain: &Terrain,
        camera: &Camera,
        fps: &FpsCounter,
        brush: &mut TextBrush<FontArc>,
    ) {
        let frame = match self.surface.get_current_texture() {
            wgpu::CurrentSurfaceTexture::Success(frame) => frame,
            wgpu::CurrentSurfaceTexture::Outdated | wgpu::CurrentSurfaceTexture::Lost => {
                // サイズが古くなったりロストした場合は再設定
                self.surface.configure(&self.device, &self.config);
                return;
            }
            wgpu::CurrentSurfaceTexture::Suboptimal(frame) => {
                self.surface.configure(&self.device, &self.config);
                frame
            }
            wgpu::CurrentSurfaceTexture::Timeout
            | wgpu::CurrentSurfaceTexture::Occluded
            | wgpu::CurrentSurfaceTexture::Validation => {
                return;
            }
        };

        let view = frame
            .texture
            .create_view(&wgpu::TextureViewDescriptor::default());

        let mut encoder = self
            .device
            .create_command_encoder(&wgpu::CommandEncoderDescriptor {
                label: Some("Render Encoder"),
            });

        {
            let mut render_pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("Render Pass"),
                color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                    view: &render_info.color_view,
                    resolve_target: None,
                    depth_slice: None,
                    ops: wgpu::Operations {
                        load: wgpu::LoadOp::Clear(wgpu::Color {
                            r: 0.0,
                            g: 0.0,
                            b: 0.0,
                            a: 1.0,
                        }),
                        store: wgpu::StoreOp::Store,
                    },
                })],

                // 深度出力アタッチメント
                depth_stencil_attachment: Some(wgpu::RenderPassDepthStencilAttachment {
                    view: &render_info.depth_view,
                    depth_ops: Some(wgpu::Operations {
                        load: wgpu::LoadOp::Clear(0.0), // 初期最大深度
                        store: wgpu::StoreOp::Store,
                    }),
                    stencil_ops: None,
                }),
                timestamp_writes: None,
                occlusion_query_set: None,
                multiview_mask: None,
            });

            // パイプラインと各種リソースバッファの設定
            render_pass.set_pipeline(&pipelines.blocks_render_pipeline);
            render_pass.set_bind_group(0, &pipelines.general_uniform_bind_group, &[]); // スロット0にMVP行列のUniformを設定
            render_pass.set_bind_group(1, &camera_gpu.bind_group, &[]); // スロット1 (カメラ)

            // チャンク
            let chunk_positions_in_view = terrain.chunks_in_view(camera);
            for pos_in_view in chunk_positions_in_view {
                let chunk = terrain.chunks.get(&pos_in_view).unwrap();
                if chunk.blocks.is_some() && chunk.num_indices > 0 {
                    render_pass.set_vertex_buffer(0, chunk.vertex_buffer.slice(..));
                    render_pass
                        .set_index_buffer(chunk.index_buffer.slice(..), wgpu::IndexFormat::Uint32);
                    
                    render_pass.set_bind_group(2, &chunk.bind_group, &[]);
                    render_pass.draw_indexed(0..chunk.num_indices, 0, 0..1);
                }
            }

            // パイプラインを空描画用に切り替える
            render_pass.set_pipeline(&pipelines.sky_render_pipeline);
            // カメラ情報
            render_pass.set_bind_group(1, &camera_gpu.bind_group, &[]);
            // 頂点バッファを使わずに、3つの頂点（インデックス0, 1, 2）で描画を実行
            render_pass.draw(0..3, 0..1);
        }

        // ポストプロセッシング（フォグ）パスを実行
        {
            let post_process_bind_group = self.device.create_bind_group(&wgpu::BindGroupDescriptor {
                layout: &pipelines.post_process_bind_group_layout,
                entries: &[
                    wgpu::BindGroupEntry {
                        binding: 0,
                        resource: wgpu::BindingResource::TextureView(&render_info.color_view),
                    },
                    wgpu::BindGroupEntry {
                        binding: 1,
                        resource: wgpu::BindingResource::TextureView(&render_info.depth_view),
                    },
                ],
                label: Some("Post Process Bind Group"),
            });

            let mut post_pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("Post Process Render Pass"),
                color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                    view: &view, // 画面サーフェスに書き出す
                    resolve_target: None,
                    depth_slice: None,
                    ops: wgpu::Operations {
                        load: wgpu::LoadOp::Clear(wgpu::Color {
                            r: 0.0,
                            g: 0.0,
                            b: 0.0,
                            a: 1.0,
                        }),
                        store: wgpu::StoreOp::Store,
                    },
                })],
                depth_stencil_attachment: None, // 深度テストは不要
                timestamp_writes: None,
                occlusion_query_set: None,
                multiview_mask: None,
            });

            post_pass.set_pipeline(&pipelines.post_process_pipeline);
            post_pass.set_bind_group(0, &post_process_bind_group, &[]);
            post_pass.set_bind_group(1, &camera_gpu.bind_group, &[]);
            post_pass.set_bind_group(2, &pipelines.general_uniform_bind_group, &[]);
            post_pass.draw(0..3, 0..1); // 全画面三角形を描画
        }

        
        // // テキスト情報を構築してキューに追加
        let fps_text = format!("FPS: {:.0}", &fps.fps());
        let coord = camera.xyz();
        let coord_text = format!("{:.0}, {:.0}, {:.0}", coord.0, coord.1, coord.2);

        let fps_section = TextSection::default()
            .add_text(
                Text::new(&fps_text)
                    .with_scale(20.0)
                    .with_color([0.0, 0.0, 0.0, 1.0]),
            )
            .with_screen_position((10.0, 10.0));

        let coord_section = TextSection::default()
            .add_text(
                Text::new(&coord_text)
                    .with_scale(20.0)
                    .with_color([0.0, 0.0, 0.0, 1.0]),
            )
            .with_screen_position((10.0, 30.0));

        brush
            .queue(&self.device, &self.queue, [&fps_section, &coord_section])
            .unwrap();

        {
            let mut rpass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("Text Render Pass"),
                color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                    view: &view, // スワップチェーンの TextureView
                    resolve_target: None,
                    ops: wgpu::Operations {
                        load: wgpu::LoadOp::Load, // 前の3D描画結果の上に重ねるためLoadを使用
                        store: wgpu::StoreOp::Store,
                    },
                    depth_slice: None,
                })],
                depth_stencil_attachment: None,
                timestamp_writes: None,
                occlusion_query_set: None,
                multiview_mask: None,
            });

            brush.draw(&mut rpass);
        }

        // コマンドを実行キューに送信
        self.queue.submit(std::iter::once(encoder.finish()));
        // 画面の更新（フリップ）
        frame.present();
    }
}
