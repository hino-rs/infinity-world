use std::sync::{Arc, mpsc};

use web_time::Instant;
use wgpu_text::glyph_brush::ab_glyph::FontArc;
use wgpu_text::{BrushBuilder, TextBrush};
use winit::application::ApplicationHandler;
use winit::event::WindowEvent;
use winit::keyboard::{KeyCode, PhysicalKey};
use winit::window::Window;

use crate::camera::CameraGpu;
use crate::compute::{ChunkUniforms, Compute};
use crate::consts::BATCH_SIZE;
use crate::fps::FpsCounter;
use crate::gpu::GpuContext;
use crate::pipeline::PipelineRegistry;
use crate::render_info::RenderInfo;
use crate::world::World;
use half::f16;

static FONT_BYTES: &[u8] = include_bytes!("../assets/fonts/NotoSansJP-VariableFont_wght.ttf");

/// アプリケーション設定。起動時のコマンドにする。
///
/// - fullscreen: ウィンドウをボーダーレスフルスクリーンで展開します
/// - debug: アプリケーションを1分後に強制終了し、総フレーム数を表示します
/// - touchpad: ラップトップなどのタッチパッド用に、感度を高く設定します
/// - vsync: VSyncをオンにします
/// - fullpower: 電源モードをパフォーマンス優先にします
#[derive(Default)]
pub struct AppOption {
    pub fullscreen: bool,
    pub debug: bool,
    pub touchpad: bool,
    pub vsync: bool,
    pub fullpower: bool,
}

/// アプリケーション本体
pub struct Application {
    pub window: Option<Arc<Window>>,
    pub gpu: Option<GpuContext>,
    pub pipelines: Option<PipelineRegistry>,
    pub world: Option<World>,
    pub last_render_time: Instant,
    pub camera_gpu: Option<CameraGpu>,
    pub time: Instant,
    pub render: Option<RenderInfo>,
    pub fps: FpsCounter,
    pub brush: Option<TextBrush<FontArc>>,
    pub now: Instant,
    pub frames: u128,
    option: AppOption,
    pub compute: Option<Compute>,
    pub gpu_env_in_progress: bool,
    pub env_rx: mpsc::Receiver<Result<(), wgpu::BufferAsyncError>>,
    pub env_tx: mpsc::Sender<Result<(), wgpu::BufferAsyncError>>,
    pub current_temp: f32,
    pub current_mois: f32,
}

impl Application {
    /// アプリケーションを初期化します。
    /// オプションを渡さない場合はデフォルトの設定になります。
    pub fn new(option: Option<AppOption>) -> Self {
        let (env_tx, env_rx) = mpsc::channel();
        Self {
            window: None,
            gpu: None,
            pipelines: None,
            world: None,
            last_render_time: Instant::now(),
            camera_gpu: None,
            time: Instant::now(),
            render: None,
            fps: FpsCounter::new(120),
            brush: None,
            now: Instant::now(),
            frames: 0,
            option: option.unwrap_or_default(),
            compute: None,
            gpu_env_in_progress: false,
            env_rx,
            env_tx,
            current_temp: 0.0,
            current_mois: 0.0,
        }
    }
}

impl ApplicationHandler for Application {
    fn resumed(&mut self, event_loop: &winit::event_loop::ActiveEventLoop) {
        if self.window.is_some() {
            return;
        }

        // ウィンドウ作成
        let window = Arc::new(
            event_loop
                .create_window(if self.option.fullscreen {
                    // フルスクリーン
                    Window::default_attributes()
                        .with_fullscreen(Some(winit::window::Fullscreen::Borderless(None)))
                } else {
                    Window::default_attributes()
                })
                .unwrap(),
        );
        window
            .set_cursor_grab(winit::window::CursorGrabMode::Confined) // カーソルをウィンドウ内に閉じ込める
            .ok();
        window.set_cursor_visible(false); // カーソルを非表示に

        // フォント
        let font = FontArc::try_from_slice(FONT_BYTES).expect("フォント読み込み失敗");
        // GPU周り
        let gpu = pollster::block_on(GpuContext::new(
            Arc::clone(&window),
            self.option.vsync,
            self.option.fullpower,
        ));
        // パイプライン
        let pipelines = PipelineRegistry::new(&gpu.device, &gpu.config);
        // ワールド
        let world = World::new(
            gpu.config.width as f32 / gpu.config.height as f32,
            if self.option.touchpad { 0.03 } else { 0.003 }, // 感度
        );
        // カメラのユニフォーム、バッファ、バインドグループ
        let camera_gpu = CameraGpu::new(
            &gpu.device,
            &pipelines.camera_uniform_bind_group_layout,
            &world.camera,
        );
        // 描画時の深度や色設定
        let render = RenderInfo::new(&gpu.device, &gpu.config);
        // wgpu_text
        let brush = BrushBuilder::using_font(font).build(
            &gpu.device,
            gpu.config.width,
            gpu.config.height,
            gpu.config.format,
        );
        // コンピュート
        let compute = Compute::build(&gpu.device);

        self.window = Some(window);
        self.gpu = Some(gpu);
        self.pipelines = Some(pipelines);
        self.world = Some(world);
        self.camera_gpu = Some(camera_gpu);
        self.render = Some(render);
        self.brush = Some(brush);
        self.compute = Some(compute);
    }

    fn window_event(
        &mut self,
        event_loop: &winit::event_loop::ActiveEventLoop,
        _window_id: winit::window::WindowId,
        event: winit::event::WindowEvent,
    ) {
        match event {
            WindowEvent::CloseRequested => {
                event_loop.exit();
            }
            WindowEvent::KeyboardInput {
                event: key_event, ..
            } => {
                // エスケープでアプリ終了
                if key_event.physical_key == PhysicalKey::Code(KeyCode::Escape) {
                    event_loop.exit();
                }

                // キーボード操作とプレイヤー移動のための処理
                if let Some(world) = &mut self.world {
                    if let PhysicalKey::Code(keycode) = key_event.physical_key {
                        world.player_controller.process_keyboard(
                            keycode,
                            key_event.state.is_pressed(),
                            key_event.repeat,
                        );
                    }
                }
            }
            WindowEvent::Resized(physical_size) => {
                if let (Some(gpu), Some(render_info), Some(brush)) =
                    (&mut self.gpu, &mut self.render, &mut self.brush)
                {
                    gpu.resize(physical_size, render_info, brush);
                }
            }
            WindowEvent::RedrawRequested => {
                // デバッグモードで1分終了
                if self.option.debug {
                    self.frames += 1;
                    if self.now.elapsed().as_secs() > 60 {
                        println!("総フレーム数: {}", self.frames);
                        panic!();
                    }
                }

                let now = Instant::now();
                let dt = now.duration_since(self.last_render_time).as_secs_f32();
                self.last_render_time = now;

                if let (
                    Some(window),
                    Some(world),
                    Some(gpu),
                    Some(camera_gpu),
                    Some(pipelines),
                    Some(render),
                    Some(brush),
                    Some(compute),
                ) = (
                    &mut self.window,
                    &mut self.world,
                    &mut self.gpu,
                    &mut self.camera_gpu,
                    &self.pipelines,
                    &self.render,
                    &mut self.brush,
                    &self.compute,
                ) {
                    let time = Instant::now().duration_since(self.time).as_secs_f32();
                    // GPUへ時間を伝える
                    pipelines.update_general_uniform(&gpu.queue, time);
                    // ワールド状態を進める
                    world.update(
                        dt,
                        &gpu.device,
                        compute,
                        &gpu.queue,
                    );
                    camera_gpu.update(&gpu.queue, &world.camera);
                    let _delta = self.fps.tick();
                    let _ = gpu.device.poll(wgpu::PollType::Poll);

                    if self.gpu_env_in_progress {
                        match self.env_rx.try_recv() {
                            Ok(Ok(())) => {
                                let envs = compute.read_env();
                                let player_block_pos = world.player.position.as_ivec3();
                                let lx = player_block_pos.x.rem_euclid(32) as usize;
                                let ly = player_block_pos.y.rem_euclid(32) as usize;
                                let lz = player_block_pos.z.rem_euclid(32) as usize;
                                let index = ly * 1024 + lx * 32 + lz;
                                if index < envs[0].len() {
                                    let packed = envs[0][index];
                                    let temp_bits = (packed & 0xffff) as u16;
                                    let mois_bits = ((packed >> 16) & 0xffff) as u16;
                                    self.current_temp = f16::from_bits(temp_bits).to_f32();
                                    self.current_mois = f16::from_bits(mois_bits).to_f32();
                                }
                                self.gpu_env_in_progress = false;
                            }
                            Ok(Err(e)) => {
                                println!("GPU env generation mapping failed: {:?}", e);
                                self.gpu_env_in_progress = false;
                            }
                            Err(mpsc::TryRecvError::Empty) => {
                                // まだGPU計算中。何もしない（前回の値を保持）
                            }
                            Err(mpsc::TryRecvError::Disconnected) => {
                                panic!("GPU env channel disconnected!");
                            }
                        }
                    }

                    if !self.gpu_env_in_progress {
                        let cp = world.player.current_chunk_pos();
                        let mut chunk_uniforms = vec![ChunkUniforms::new(world.seed); BATCH_SIZE];
                        chunk_uniforms[0] = ChunkUniforms {
                            chunk_pos: [cp.x, cp.y, cp.z],
                            seed: world.seed,
                        };
                        compute.update_env(&gpu.device, &gpu.queue, &chunk_uniforms);
                        compute.request_env_async(self.env_tx.clone());
                        self.gpu_env_in_progress = true;
                    }

                    gpu.render(
                        render,
                        pipelines,
                        camera_gpu,
                        &world.terrain,
                        &world.camera,
                        &self.fps,
                        brush,
                        self.current_temp,
                        self.current_mois,
                    );
                    window.request_redraw();
                }
            }
            _ => {}
        }
    }

    fn device_event(
        &mut self,
        _event_loop: &winit::event_loop::ActiveEventLoop,
        _device_id: winit::event::DeviceId,
        event: winit::event::DeviceEvent,
    ) {
        // マウスの相対移動量 (dx, dy) を取得してカメラを回転
        if let winit::event::DeviceEvent::MouseMotion { delta } = event {
            if let Some(world) = &mut self.world {
                world.camera.process_mouse(delta.0, delta.1);
            }
        }
    }
}
