use std::sync::Arc;

use web_time::Instant;
use wgpu_text::glyph_brush::ab_glyph::FontArc;
use wgpu_text::{BrushBuilder, TextBrush};
use winit::application::ApplicationHandler;
use winit::event::WindowEvent;
use winit::keyboard::{KeyCode, PhysicalKey};
use winit::window::Window;

use crate::camera::CameraGpu;
use crate::compute::Compute;
use crate::fps::FpsCounter;
use crate::gpu::GpuContext;
use crate::pipeline::PipelineRegistry;
use crate::render_info::RenderInfo;
use crate::world::World;


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
    pub current_temp: f32,
    pub current_mois: f32,
    pub current_wind_dir: f32,
    pub current_wind_speed: f32,
}

impl Application {
    /// アプリケーションを初期化します。
    /// オプションを渡さない場合はデフォルトの設定になります。
    pub fn new(option: Option<AppOption>) -> Self {
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

            current_temp: 0.0,
            current_mois: 0.0,
            current_wind_dir: 0.0,
            current_wind_speed: 0.0,
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
            if self.option.touchpad { 0.03 } else { 0.003 }, // 感
            &gpu.device,
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
                        if keycode == KeyCode::KeyC && key_event.state.is_pressed() {
                            world.camera.tps = !world.camera.tps;
                        }
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
                    pipelines.update_general_uniform(&gpu.queue, time, world.player.position, world.camera.tps);

                    // ワールド状態を進める
                    world.update(dt, &gpu.device, compute, &gpu.queue);
                    camera_gpu.update(&gpu.queue, &world.camera);
                    let _delta = self.fps.tick();
                    let _ = gpu.device.poll(wgpu::PollType::Poll);

                    let player_pos = world.player.position;
                    let (temp, mois) = crate::utils::get_climate(player_pos.x, player_pos.z, world.seed);
                    let (wind_dir, wind_speed) = crate::utils::get_wind(player_pos.x, player_pos.z, world.seed);
                    self.current_temp = temp;
                    self.current_mois = mois;
                    self.current_wind_dir = wind_dir;
                    self.current_wind_speed = wind_speed;

                    gpu.render(
                        render,
                        pipelines,
                        camera_gpu,
                        &world.terrain,
                        &world.camera,
                        &world.player,
                        &self.fps,
                        brush,
                        self.current_temp,
                        self.current_mois,
                        self.current_wind_dir,
                        self.current_wind_speed,
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
