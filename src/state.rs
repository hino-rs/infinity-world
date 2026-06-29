use crate::{
    camera::{Camera, CameraController, CameraUniform}, game::{self, BlockType}, terrain::{self, Chunk, create_terrain},
};

use wgpu_text::{
    glyph_brush::{ab_glyph::FontArc, Section as TextSection, Text},
    BrushBuilder, TextBrush,
};
use std::sync::Arc;
use wgpu::util::DeviceExt;
use winit::window::Window;
use web_time::Instant;
use std::collections::VecDeque;
use rayon::prelude::*;

pub const CHUNK_SIZE: usize = 8;
pub const CHUNK_AREA: usize = CHUNK_SIZE * MAX_HEIGHT;
pub const MAX_HEIGHT: usize = 256;
pub const WALK_SPEED: f32 = 6.0;
pub const RADIUS: i32 = 1;
pub const PLAYER_HALF_WIDTH: f32 = 0.3; // 横幅の半分（全幅 0.6）
pub const PLAYER_HEIGHT: f32 = 1.8;     // 身長（足元から目まで）

// pub type CHUNK_BLOCKS = [[[BlockType; CHUNK_SIZE]; MAX_HEIGHT]; CHUNK_SIZE];
pub type ChunkBlocks = [BlockType; CHUNK_SIZE * MAX_HEIGHT * CHUNK_SIZE];

// フォント
static FONT_BYTES: &[u8] = include_bytes!("../assets/fonts/NotoSansJP-VariableFont_wght.ttf");

#[repr(C)]
#[derive(Copy, Clone, Debug, bytemuck::Pod, bytemuck::Zeroable)]
struct GeneralUniforms {
    time: f32,
    _p1: [f32; 3],
}

pub struct FpsCounter {
    pub last_frame: Instant,
    pub frame_times: VecDeque<f64>, // 直近Nフレームの時間
    pub max_samples: usize,
    pub cached_fps: f64,
    pub min_frame_time: f64,
    pub max_frame_time: f64,
}

impl FpsCounter {
    fn new(samples: usize) -> Self {
        Self {
            last_frame: Instant::now(),
            frame_times: VecDeque::with_capacity(samples),
            max_samples: samples,
            cached_fps: 0.0,
            min_frame_time: f64::MAX,
            max_frame_time: 0.0,
        }
    }

    pub fn tick(&mut self) -> f64 {
        let now = Instant::now();
        let delta = now.duration_since(self.last_frame).as_secs_f64();
        self.last_frame = now;

        if self.frame_times.len() >= self.max_samples {
            self.frame_times.pop_front();
        }
        self.frame_times.push_back(delta);

        // FPS計算
        let avg_delta = self.frame_times.iter().sum::<f64>()
            / self.frame_times.len() as f64;
        self.cached_fps = if avg_delta > 0.0 { 1.0 / avg_delta } else { 0.0 };

        self.min_frame_time = self.min_frame_time.min(delta);
        self.max_frame_time = self.max_frame_time.max(delta);

        delta
    }

    fn fps(&self) -> f64 {
        self.cached_fps
    }

    // フレーム時間
    fn frame_time_ms(&self) -> f64 {
        if let Some(&last) = self.frame_times.back() {
            last * 1000.0
        } else {
            0.0
        }
    }

    // 最小FPS
    fn min_fps(&self) -> f64 {
        if self.max_frame_time > 0.0 { 1.0 / self.max_frame_time } else { 0.0 }
    }

    // 最大FPS
    pub fn max_fps(&self) -> f64 {
        if self.min_frame_time < f64::MAX { 1.0 / self.min_frame_time } else { 0.0 }
    }

    // サンプルのリセット
    pub fn reset_stats(&mut self) {
        self.min_frame_time = f64::MAX;
        self.max_frame_time = 0.0;
    }

    pub fn summary(&self) -> String {
        format!(
            "FPS: {:.1} | Frame: {:.2}ms | Min: {:.1} Max: {:.1}",
            self.fps(),
            self.frame_time_ms(),
            self.min_fps(),
            self.max_fps(),
        )
    }
}

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

    sky_pipeline: wgpu::RenderPipeline,

    uniform_buffer: wgpu::Buffer,
    /// Uniformバッファにアクセスするためのバインドグループ
    uniform_bind_group: wgpu::BindGroup,
    /// 3Dの前後関係を正しく描画するための深度バッファテクスチャ
    depth_texture: wgpu::Texture,
    depth_view: wgpu::TextureView,

    chunks: Vec<Chunk>,

    pub camera: Camera,
    camera_uniform: CameraUniform,
    camera_buffer: wgpu::Buffer,
    camera_bind_group: wgpu::BindGroup,
    pub camera_controller: CameraController,

    pub fps: FpsCounter,

    time: Instant,
    brush: TextBrush<FontArc>,
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
            present_mode: wgpu::PresentMode::AutoNoVsync,
            alpha_mode: surface_caps.alpha_modes[0],
            view_formats: vec![],
            desired_maximum_frame_latency: 2,
        };
        surface.configure(&device, &config);

        let camera = Camera::new(
            glam::Vec3::new(5.0, 100.0, 5.0),
            0.0f32.to_radians(),
            -20.0f32.to_radians(),
            config.width as f32 / config.height as f32,
            90.0f32.to_radians(),
            0.1,
            (CHUNK_SIZE * RADIUS as usize) as f32 * 1.5,
        );

        let mut camera_uniform = CameraUniform::new();
        camera_uniform.update_view_proj(&camera);

        let camera_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Camera Buffer"),
            contents: bytemuck::cast_slice(&[camera_uniform]),
            usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
        });

        let camera_bind_group_layout =
            device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
                entries: &[wgpu::BindGroupLayoutEntry {
                    binding: 0,
                    visibility: wgpu::ShaderStages::VERTEX | wgpu::ShaderStages::FRAGMENT,
                    ty: wgpu::BindingType::Buffer {
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                }],
                label: Some("camera_bind_group_layout"),
            });

        let camera_bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
            layout: &camera_bind_group_layout,
            entries: &[wgpu::BindGroupEntry {
                binding: 0,
                resource: camera_buffer.as_entire_binding(),
            }],
            label: Some("camera_bind_group"),
        });

        let camera_controller = CameraController::new(WALK_SPEED, 0.003);

        // 深度バッファの初期作成
        let (depth_texture, depth_view) = Self::create_depth_texture(&device, &config);

        let uniform_bind_group_layout =
            device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
                entries: &[wgpu::BindGroupLayoutEntry {
                    binding: 0,                             // シェーダー内の @binding(0) に対応
                    visibility: wgpu::ShaderStages::VERTEX | wgpu::ShaderStages::FRAGMENT, // 頂点シェーダーから参照
                    ty: wgpu::BindingType::Buffer {
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                }],
                label: Some("Uniform Bind Group Layout"),
            });

        let uniform_data = GeneralUniforms {
            time: 0.0,
            _p1: [0.0, 0.0, 0.0],
        };
        let uniform_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Uniform Buffer"),
            contents: bytemuck::bytes_of(&uniform_data),
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

        // WGSLシェーダーファイルの読み込みとモジュール化
        let shader = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("Shader"),
            source: wgpu::ShaderSource::Wgsl(include_str!("shader.wgsl").into()),
        });

        // パイプラインレイアウトの作成（使用する全てのBindGroupレイアウトを定義）
        let render_pipeline_layout =
            device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
                label: Some("Render Pipeline Layout"),
                bind_group_layouts: &[
                    Some(&uniform_bind_group_layout),
                    Some(&camera_bind_group_layout), // バインドグループ1として登録
                ],
                immediate_size: 0,
            });

        let now = Instant::now();
        // 座標リストを作る
        let coords: Vec<(i32, i32)> = (-RADIUS..=RADIUS)
            .flat_map(|cx| (-RADIUS..=RADIUS).map(move |cz| (cx, cz)))
            .collect();

        // CPU処理だけ並列化
        let cpu_results: Vec<_> = coords
            .par_iter()
            .map(|&(cx, cz)| {
                let blocks = create_terrain(cx, cz);
                let (verts, inds) = terrain::build_chunk_mesh(&blocks, cx, cz);
                (cx, cz, blocks, verts, inds)
            })
            .collect();

        // GPUバッファ生成
        let mut chunks = Vec::with_capacity(cpu_results.len());
        for (cx, cz, blocks, verts, inds) in cpu_results {
            let vertex_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
                label: Some("Chunk Vertex Buffer"),
                contents: bytemuck::cast_slice(&verts),
                usage: wgpu::BufferUsages::VERTEX,
            });
            let index_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
                label: Some("Chunk Index Buffer"),
                contents: bytemuck::cast_slice(&inds),
                usage: wgpu::BufferUsages::INDEX,
            });
            chunks.push(Chunk {
                coord: (cx, cz),
                blocks,
                vertex_buffer,
                index_buffer,
                num_indices: inds.len() as u32,
            });
        }
        println!("地形生成とメッシュ作成にかかった時間: {}ms", now.elapsed().as_millis());

        // レンダリングパイプライン全体の作成
        let render_pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("Render Pipeline"),
            layout: Some(&render_pipeline_layout),

            // 頂点ステージの設定
            vertex: wgpu::VertexState {
                module: &shader,
                entry_point: Some("vs_main"),
                buffers: &[
                    game::TerrainVertex::desc(), // スロット 0: チャンクメッシュ用 (VertexStepMode::Vertex)
                ],
                compilation_options: Default::default(),
            },

            // フラグメント（ピクセル）ステージの設定
            fragment: Some(wgpu::FragmentState {
                module: &shader,
                entry_point: Some("fs_main"),
                targets: &[Some(wgpu::ColorTargetState {
                    format: config.format,
                    blend: Some(wgpu::BlendState::REPLACE), 
                    write_mask: wgpu::ColorWrites::ALL,
                })],
                compilation_options: Default::default(),
            }),

            // プリミティブ形状の設定
            primitive: wgpu::PrimitiveState {
                topology: wgpu::PrimitiveTopology::TriangleList,
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

        let sky_pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("Sky Render Pipeline"),
            layout: Some(&render_pipeline_layout),
            vertex: wgpu::VertexState {
                module: &shader,
                entry_point: Some("vs_sky"),
                buffers: &[], // 空描画は頂点バッファを渡さないので、空の配列を指定する
                compilation_options: Default::default(),
            },
            fragment: Some(wgpu::FragmentState {
                module: &shader,
                entry_point: Some("fs_sky"),
                targets: &[Some(wgpu::ColorTargetState {
                    format: config.format,
                    blend: Some(wgpu::BlendState::REPLACE),
                    write_mask: wgpu::ColorWrites::ALL,
                })],
                compilation_options: Default::default(),
            }),
            primitive: wgpu::PrimitiveState {
                topology: wgpu::PrimitiveTopology::TriangleList,
                strip_index_format: None,
                front_face: wgpu::FrontFace::Ccw,
                cull_mode: None, // 全画面三角形がカリングされないように
                ..Default::default()
            },
            depth_stencil: Some(wgpu::DepthStencilState {
                format: wgpu::TextureFormat::Depth32Float,
                depth_write_enabled: Some(false), // 空の深度は深度バッファに書き込まない
                depth_compare: Some(wgpu::CompareFunction::LessEqual), 
                stencil: wgpu::StencilState::default(),
                bias: wgpu::DepthBiasState::default(),
            }),
            multisample: wgpu::MultisampleState {
                count: 1,
                mask: 1,
                alpha_to_coverage_enabled: false,
            },
            multiview_mask: None,
            cache: None,
        });

        let font = FontArc::try_from_slice(FONT_BYTES).expect("フォント読み込み失敗");
        let brush = BrushBuilder::using_font(font)
            .build(&device, config.width, config.height, config.format);

        Self {
            surface,
            device,
            queue,
            config,
            render_pipeline,
            sky_pipeline,
            uniform_buffer,
            uniform_bind_group,
            depth_texture,
            depth_view,
            time: Instant::now(),
            chunks,
            camera,
            camera_uniform,
            camera_buffer,
            camera_bind_group,
            camera_controller,
            fps: FpsCounter::new(120),
            brush,
        }
    }

    // delta だけ動かす。各軸を分離して衝突解決する
    // 戻り値は「この移動で地面に接地したか」
    fn move_player(&mut self, delta: glam::Vec3) -> bool {
        let mut on_ground = false;

        // --- X軸（壁判定・横） ---
        let mut try_eye = self.camera.eye;
        try_eye.x += delta.x;
        if self.collides_at(try_eye) {
            // 壁にぶつかった → X の移動は捨てる（= 壁に沿って滑る）
        } else {
            self.camera.eye.x = try_eye.x;
        }

        // --- Z軸（壁判定・奥行き） ---
        let mut try_eye = self.camera.eye;
        try_eye.z += delta.z;
        if self.collides_at(try_eye) {
            // Z の移動を捨てる
        } else {
            self.camera.eye.z = try_eye.z;
        }

        // --- Y軸（地面・天井） ---
        let mut try_eye = self.camera.eye;
        try_eye.y += delta.y;
        if self.collides_at(try_eye) {
            // 縦にぶつかった
            if delta.y < 0.0 {
                on_ground = true; // 下向きで衝突 → 着地
            }
            // 上向きで衝突なら頭をぶつけた。いずれも縦速度を殺す
            self.camera_controller.velocity_y = 0.0;
        } else {
            self.camera.eye.y = try_eye.y;
        }

        on_ground
    }

    // 目の高さを基準としたプレイヤーAABBが地形と重なっているか
    fn collides_at(&self, eye: glam::Vec3) -> bool {
        let min_x = eye.x - PLAYER_HALF_WIDTH;
        let max_x = eye.x + PLAYER_HALF_WIDTH;
        let min_y = eye.y - PLAYER_HEIGHT;
        let max_y = eye.y;
        let min_z = eye.z - PLAYER_HALF_WIDTH;
        let max_z = eye.z + PLAYER_HALF_WIDTH;

        // AABB が触れうるブロックセルの範囲を求める。
        // ブロックは中心が整数で占有が [中心-0.5, 中心+0.5] なので、
        // 座標 p が属するセル番号は (p + 0.5).floor()。
        let x0 = (min_x + 0.5).floor() as i32;
        let x1 = (max_x + 0.5).floor() as i32;
        let y0 = (min_y + 0.5).floor() as i32;
        let y1 = (max_y + 0.5).floor() as i32;
        let z0 = (min_z + 0.5).floor() as i32;
        let z1 = (max_z + 0.5).floor() as i32;

        for wx in x0..=x1 {
            for wy in y0..=y1 {
                for wz in z0..=z1 {
                    if self.is_solid_world(wx, wy, wz) {
                        return true; // 1つでも重なれば衝突
                    }
                }
            }
        }
        false
    }

    pub fn update(&mut self, dt: f32) {
        let time = Instant::now().duration_since(self.time).as_secs_f32();
        // このフレームの希望移動量を計算（controller は前フレームの on_ground を参照）
        let delta = self.camera_controller.compute_move(&mut self.camera, dt);

        // 軸分離で実際に動かし、接地したかを受け取る
        let on_ground = self.move_player(delta);

        // 接地状態を controller に書き戻す（次フレームのジャンプ/重力判定に使う）
        self.camera_controller.on_ground = on_ground;

        self.queue.write_buffer(
            &self.uniform_buffer, 
            0, 
            bytemuck::bytes_of(&GeneralUniforms {
                time: time,
                _p1: [0.0, 0.0, 0.0],
            }),
        );

        // カメラUniformの更新と書き込み
        self.camera_uniform.update_view_proj(&self.camera);
        self.queue.write_buffer(
            &self.camera_buffer,
            0,
            bytemuck::cast_slice(&[self.camera_uniform]),
        );
    }
    
    // ワールド座標のブロックを返す
    fn block_at_world(&self, wx: i32, wy: i32, wz: i32) -> BlockType {
        if wy < 0 || wy >= MAX_HEIGHT as i32 {
            return BlockType::Air;
        }

        // ワールド座標をチャンク座標+チャンク内ローカル座標に分解
        let cx = wx.div_euclid(CHUNK_SIZE as i32);
        let cz = wz.div_euclid(CHUNK_SIZE as i32);
        let lx = wx.rem_euclid(CHUNK_SIZE as i32);
        let lz = wz.rem_euclid(CHUNK_SIZE as i32);

        // 該当チャンクを探す
        let Some(chunk) = self.chunks.iter().find(|c| c.coord == (cx, cz)) else {
            return BlockType::Air;
        };

        let index = (lx as usize) * CHUNK_AREA
                  + (wy as usize) * CHUNK_SIZE
                  + (lz as usize);
        chunk.blocks[index]
    }

    // ワールド座標かソリッドか
    fn is_solid_world(&self, wx: i32, wy: i32, wz: i32) -> bool {
        self.block_at_world(wx, wy, wz) != BlockType::Air
    }

    /// ウィンドウサイズ変更時に呼び出され、描画領域と深度バッファを再構成
    pub fn resize(&mut self, new_size: winit::dpi::PhysicalSize<u32>) {
        if new_size.width > 0 && new_size.height > 0 {
            self.config.width = new_size.width;
            self.config.height = new_size.height;
            // サーフェス（描画ウィンドウ）のサイズ再設定
            self.surface.configure(&self.device, &self.config);
            // テキストブラシにプロジェクションサイズ変更を通知
            self.brush.resize_view(new_size.width as f32, new_size.height as f32, &self.queue);
            // ウィンドウサイズに応じた大きさで深度テクスチャを再生成
            let (depth_texture, depth_view) =
                Self::create_depth_texture(&self.device, &self.config);
            self.depth_texture = depth_texture;
            self.depth_view = depth_view;
        }
    }

    /// 毎フレーム実行されるレンダリング処理。
    pub fn render(&mut self) {
        let _delta = self.fps.tick();

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
            wgpu::CurrentSurfaceTexture::Timeout
            | wgpu::CurrentSurfaceTexture::Occluded
            | wgpu::CurrentSurfaceTexture::Validation => {
                return;
            }
        };

        // レンダーテクスチャからビューを作成
        let view = frame
            .texture
            .create_view(&wgpu::TextureViewDescriptor::default());

        // GPUに指示するコマンドエンコーダーの作成
        let mut encoder = self
            .device
            .create_command_encoder(&wgpu::CommandEncoderDescriptor {
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
                            r: 0.0,
                            g: 0.0,
                            b: 0.0,
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
            render_pass.set_bind_group(1, &self.camera_bind_group, &[]); // スロット1 (カメラ)
            
            // チャンク
            for chunk in &self.chunks {
                render_pass.set_vertex_buffer(0, chunk.vertex_buffer.slice(..));
                render_pass.set_index_buffer(chunk.index_buffer.slice(..), wgpu::IndexFormat::Uint32);
                render_pass.draw_indexed(0..chunk.num_indices, 0, 0..1);
            }

            // パイプラインを空描画用に切り替える
            render_pass.set_pipeline(&self.sky_pipeline);
            // カメラ情報（逆行列や現在位置が入っている）が必要なのでバインドグループ1を設定する
            render_pass.set_bind_group(1, &self.camera_bind_group, &[]);
            // 頂点バッファを使わずに、3つの頂点（インデックス0, 1, 2）で描画を実行
            render_pass.draw(0..3, 0..1);
        }

        // テキスト情報を構築してキューに追加
        let fps_text = format!("FPS: {:.0}", &self.fps.fps());
        let coord = self.camera.xyz();
        let coord_text = format!("{:.0}, {:.0}, {:.0}", coord.0, coord.1, coord.2);

        let fps_section = TextSection::default()
            .add_text(
                Text::new(&fps_text)
                    .with_scale(20.0)
                    .with_color([0.0, 0.0, 0.0, 1.0])
            )
            .with_screen_position((10.0, 10.0));

        let coord_section = TextSection::default()
            .add_text(
                Text::new(&coord_text)
                    .with_scale(20.0)
                    .with_color([0.0, 0.0, 0.0, 1.0])
            )
            .with_screen_position((10.0, 30.0));

        self.brush.queue(&self.device, &self.queue, [&fps_section, &coord_section]).unwrap();

        {
            let mut rpass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("Text Render Pass"),
                color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                    view: &view,         // スワップチェーンの TextureView
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

            self.brush.draw(&mut rpass);
        }

        // コマンドを実行キューに送信
        self.queue.submit(std::iter::once(encoder.finish()));
        // 画面の更新（フリップ）
        frame.present();
    }
}
