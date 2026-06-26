use std::sync::Arc;
use winit::window::Window;
use wgpu::util::DeviceExt;
use web_time::Instant;
use crate::game;

/// レンダリング処理全体の状態を管理する構造体。
pub struct State {
    /// 描画対象のウィンドウサーフェス
    surface: wgpu::Surface<'static>,
    /// GPUデバイス（バッファやパイプラインの作成などに使用）
    device: wgpu::Device,
    /// GPU実行キュー（コマンド送信やデータ書き込みに使用）
    queue: wgpu::Queue,
    /// サーフェスの構成設定情報
    config: wgpu::SurfaceConfiguration,
    /// 立方体を描画するためのグラフィックスパイプライン
    render_pipeline: wgpu::RenderPipeline,
    /// 頂点データを格納するGPUバッファ
    vertex_buffer: wgpu::Buffer,
    /// インデックスデータを格納するGPUバッファ
    index_buffer: wgpu::Buffer,
    /// 描画するインデックス数
    num_indices: u32,
    /// MVP行列を保持するUniformバッファ
    uniform_buffer: wgpu::Buffer,
    /// Uniformバッファにアクセスするためのバインドグループ
    uniform_bind_group: wgpu::BindGroup,
    /// 3Dの前後関係を正しく描画するための深度バッファテクスチャ
    depth_texture: wgpu::Texture,
    /// 深度バッファテクスチャのビュー
    depth_view: wgpu::TextureView,
    /// アニメーションによる回転角度
    angle: f32,

    time: Instant,
}

impl State {
    /// 深度テスト用バッファを作成するヘルパー関数。
    /// ウィンドウのサイズ変更時にも再呼び出しされる。
    fn create_depth_texture(
        device: &wgpu::Device,
        config: &wgpu::SurfaceConfiguration,
    ) -> (wgpu::Texture, wgpu::TextureView) {
        let size = wgpu::Extent3d {
            width: config.width,
            height: config.height,
            depth_or_array_layers: 1,
        };
        let desc = wgpu::TextureDescriptor {
            label: Some("Depth Texture"),
            size,
            mip_level_count: 1,
            sample_count: 1,
            dimension: wgpu::TextureDimension::D2,
            format: wgpu::TextureFormat::Depth32Float, // 32ビット浮動小数点型の高精度な深度フォーマットを使用
            // 描画先（レンダーターゲット）およびシェーダーからのバインディング用としてマーク
            usage: wgpu::TextureUsages::RENDER_ATTACHMENT | wgpu::TextureUsages::TEXTURE_BINDING,
            view_formats: &[],
        };
        let texture = device.create_texture(&desc);
        let view = texture.create_view(&wgpu::TextureViewDescriptor::default());
        (texture, view)
    }

    /// State構造体の新規作成。非同期でGPUデバイス等を初期化する。
    pub async fn new(window: Arc<Window>) -> Self {
        let size = window.inner_size();

        // wgpuの各種処理を開始するためのインスタンスの作成
        let instance = wgpu::Instance::new(wgpu::InstanceDescriptor {
            backends: wgpu::Backends::all(),
            flags: wgpu::InstanceFlags::default(),
            backend_options: wgpu::BackendOptions::default(),
            display: None,
            memory_budget_thresholds: wgpu::MemoryBudgetThresholds::default(),
        });

        // 描画先となるサーフェスをOSのウィンドウから作成
        let surface = instance.create_surface(window).unwrap();

        // 物理グラフィックアダプター（GPUグラフィックボードなど）の要求
        let adapter = instance
            .request_adapter(&wgpu::RequestAdapterOptions {
                power_preference: wgpu::PowerPreference::default(),
                compatible_surface: Some(&surface),
                force_fallback_adapter: false,
            })
            .await
            .unwrap();

        // 論理デバイス（操作ハンドル）とキュー（コマンド送信窓口）の要求
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

        // サーフェスのフォーマットやサイズ等を構成
        let surface_caps = surface.get_capabilities(&adapter);
        let surface_format = surface_caps.formats[0];

        let config = wgpu::SurfaceConfiguration {
            usage: wgpu::TextureUsages::RENDER_ATTACHMENT,
            format: surface_format,
            width: size.width,
            height: size.height,
            present_mode: wgpu::PresentMode::Fifo, // VSync同期
            alpha_mode: surface_caps.alpha_modes[0],
            view_formats: vec![],
            desired_maximum_frame_latency: 2,
        };
        surface.configure(&device, &config);

        // 深度バッファの初期作成
        let (depth_texture, depth_view) = Self::create_depth_texture(&device, &config);

        // Uniform（MVP行列）のメモリ配置/スロットを記述するバインドグループレイアウトの作成
        let uniform_bind_group_layout =
            device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
                entries: &[wgpu::BindGroupLayoutEntry {
                    binding: 0, // シェーダー内の @binding(0) に対応
                    visibility: wgpu::ShaderStages::VERTEX, // 頂点シェーダーから参照
                    ty: wgpu::BindingType::Buffer {
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                }],
                label: Some("Uniform Bind Group Layout"),
            });

        // 最初のMVP行列を初期化（単位行列）してUniformバッファを作成
        let mvp = glam::Mat4::IDENTITY;
        let uniform_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Uniform Buffer"),
            contents: bytemuck::cast_slice(&[mvp.to_cols_array_2d()]),
            usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
        });

        // バッファリソースとスロットレイアウトを紐づけるバインドグループの作成
        let uniform_bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
            layout: &uniform_bind_group_layout,
            entries: &[wgpu::BindGroupEntry {
                binding: 0,
                resource: uniform_buffer.as_entire_binding(),
            }],
            label: Some("Uniform Bind Group"),
        });

        // 頂点バッファの作成（立方体の8つの頂点情報）
        let vertex_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Vertex Buffer"),
            contents: bytemuck::cast_slice(game::VERTICES),
            usage: wgpu::BufferUsages::VERTEX,
        });

        // インデックスバッファの作成（三角形面を形作るインデックス順序）
        let index_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Index Buffer"),
            contents: bytemuck::cast_slice(game::INDICES),
            usage: wgpu::BufferUsages::INDEX,
        });
        let num_indices = game::INDICES.len() as u32;

        // WGSLシェーダーファイルの読み込みとモジュール化
        let shader = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("Shader"),
            source: wgpu::ShaderSource::Wgsl(include_str!("shader.wgsl").into()),
        });

        // パイプラインレイアウトの作成（使用する全てのBindGroupレイアウトを定義）
        let render_pipeline_layout =
            device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
                label: Some("Render Pipeline Layout"),
                bind_group_layouts: &[Some(&uniform_bind_group_layout)],
                immediate_size: 0,
            });

        // レンダリングパイプライン全体の作成
        let render_pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("Render Pipeline"),
            layout: Some(&render_pipeline_layout),

            // 頂点ステージの設定
            vertex: wgpu::VertexState {
                module: &shader,
                entry_point: Some("vs_main"),
                buffers: &[game::Vertex::desc()], // game::Vertex で定義した頂点レイアウトを使用
                compilation_options: Default::default(),
            },

            // フラグメント（ピクセル）ステージの設定
            fragment: Some(wgpu::FragmentState {
                module: &shader,
                entry_point: Some("fs_main"),
                targets: &[Some(wgpu::ColorTargetState {
                    format: config.format,
                    blend: Some(wgpu::BlendState::REPLACE), // 色をそのまま置き換える
                    write_mask: wgpu::ColorWrites::ALL,
                })],
                compilation_options: Default::default(),
            }),

            // プリミティブ形状の設定
            primitive: wgpu::PrimitiveState {
                topology: wgpu::PrimitiveTopology::TriangleList, // 三角形リストとして描画
                strip_index_format: None,
                front_face: wgpu::FrontFace::Ccw, // 反時計回りを表面とする
                cull_mode: Some(wgpu::Face::Back), // 裏面カリングを有効化（見えない裏面を描画しない）
                ..Default::default()
            },

            // 深度・ステンシルテストの設定（3Dの前後隠面消去処理）
            depth_stencil: Some(wgpu::DepthStencilState {
                format: wgpu::TextureFormat::Depth32Float,
                depth_write_enabled: Some(true), // 深度情報をバッファに書き込む
                depth_compare: Some(wgpu::CompareFunction::Less), // 手前にあるもの（現在の深度より小さいもの）を描画する
                stencil: wgpu::StencilState::default(),
                bias: wgpu::DepthBiasState::default(),
            }),

            // マルチサンプリング（アンチエイリアス）の設定
            multisample: wgpu::MultisampleState {
                count: 1,
                mask: 1,
                alpha_to_coverage_enabled: false,
            },

            multiview_mask: None,
            cache: None,
        });

        Self {
            surface,
            device,
            queue,
            config,
            render_pipeline,
            vertex_buffer,
            index_buffer,
            num_indices,
            uniform_buffer,
            uniform_bind_group,
            depth_texture,
            depth_view,
            angle: 0.0,
            time: Instant::now(),
        }
    }

    /// ウィンドウサイズ変更時に呼び出され、描画領域と深度バッファを再構成
    pub fn resize(&mut self, new_size: winit::dpi::PhysicalSize<u32>) {
        if new_size.width > 0 && new_size.height > 0 {
            self.config.width = new_size.width;
            self.config.height = new_size.height;
            // サーフェス（描画ウィンドウ）のサイズ再設定
            self.surface.configure(&self.device, &self.config);
            // ウィンドウサイズに応じた大きさで深度テクスチャを再生成
            let (depth_texture, depth_view) = Self::create_depth_texture(&self.device, &self.config);
            self.depth_texture = depth_texture;
            self.depth_view = depth_view;
        }
    }

    /// 毎フレーム実行されるレンダリング処理。
    pub fn render(&mut self) {
        // サーフェスから現在の描画フレームとなるテクスチャを取得
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
            wgpu::CurrentSurfaceTexture::Timeout | wgpu::CurrentSurfaceTexture::Occluded | wgpu::CurrentSurfaceTexture::Validation => { return; }
        };

        // レンダーテクスチャからビューを作成
        let view = frame.texture.create_view(&wgpu::TextureViewDescriptor::default());

        // アニメーション角度の更新
        // self.angle += 0.01;
        
        // ビュー行列の計算 (カメラの位置: (0.0, 2.0, 5.0) から原点を見る)
        let view_matrix = glam::Mat4::look_at_lh(
            glam::Vec3::new(
                self.time.elapsed().as_secs_f32().sin()*5.0,
                self.time.elapsed().as_secs_f32().sin()+2.0,
                5.0
            ),
            glam::Vec3::ZERO,
            glam::Vec3::Y,
        );

        // 射影行列の計算 (透視投影、左手系、アスペクト比対応)
        let aspect = self.config.width as f32 / self.config.height as f32;
        let proj_matrix = glam::Mat4::perspective_lh(f32::to_radians(45.0), aspect, 0.1, 100.0);

        // モデル回転行列の計算
        let model_matrix = glam::Mat4::from_rotation_y(self.angle) * glam::Mat4::from_rotation_x(self.angle * 0.5);

        // Model * View * Projection 行列を結合してMVP行列を計算
        let mvp = proj_matrix * view_matrix * model_matrix;

        // 更新したMVP行列をGPU側のUniformバッファに書き込む
        self.queue.write_buffer(&self.uniform_buffer, 0, bytemuck::cast_slice(&[mvp.to_cols_array_2d()]));

        // GPUに指示するコマンドエンコーダーの作成
        let mut encoder = self.device.create_command_encoder(&wgpu::CommandEncoderDescriptor {
            label: Some("Render Encoder"),
        });

        {
            // レンダーパスの設定（カラーバッファのクリア色と深度バッファのアタッチメントを設定）
            let mut render_pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("Render Pass"),
                
                // カラー出力アタッチメント（背景をダークブルーでクリア）
                color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                    view: &view,
                    resolve_target: None,
                    depth_slice: None,
                    ops: wgpu::Operations {
                        load: wgpu::LoadOp::Clear(wgpu::Color {
                            r: 0.1,
                            g: 0.1,
                            b: 0.15,
                            a: 1.0,
                        }),
                        store: wgpu::StoreOp::Store,
                    },
                })],

                // 深度出力アタッチメント（1.0でクリアして新規フレームの深度判定に備える）
                depth_stencil_attachment: Some(wgpu::RenderPassDepthStencilAttachment {
                    view: &self.depth_view,
                    depth_ops: Some(wgpu::Operations {
                        load: wgpu::LoadOp::Clear(1.0), // 初期最大深度
                        store: wgpu::StoreOp::Store,
                    }),
                    stencil_ops: None,
                }),
                timestamp_writes: None,
                occlusion_query_set: None,
                multiview_mask: None,
            });

            // パイプラインと各種リソースバッファの設定
            render_pass.set_pipeline(&self.render_pipeline);
            render_pass.set_bind_group(0, &self.uniform_bind_group, &[]); // スロット0にMVP行列のUniformを設定
            render_pass.set_vertex_buffer(0, self.vertex_buffer.slice(..)); // 頂点バッファの設定
            render_pass.set_index_buffer(self.index_buffer.slice(..), wgpu::IndexFormat::Uint16); // インデックスバッファの設定
            
            // インデックス順に従って立方体を描画
            render_pass.draw_indexed(0..self.num_indices, 0, 0..1);
        }

        // コマンドを実行キューに送信
        self.queue.submit(std::iter::once(encoder.finish()));
        // 画面の更新（フリップ）
        frame.present();
    }
}
