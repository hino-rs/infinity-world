use std::sync::Arc;

use web_time::Instant;
use wgpu_text::glyph_brush::ab_glyph::FontArc;
use wgpu_text::{BrushBuilder, TextBrush};
use winit::application::ApplicationHandler;
use winit::event::WindowEvent;
use winit::keyboard::{KeyCode, PhysicalKey};
use winit::window::Window;

use crate::camera::CameraGpu;
use crate::compute::{BATCH_SIZE, ChunkUniforms, Compute};
use half::f16;
use crate::fps::FpsCounter;
use crate::gpu::GpuContext;
use crate::pipeline::PipelineRegistry;
use crate::render_info::RenderInfo;
use crate::world::World;

static FONT_BYTES: &[u8] = include_bytes!("../assets/fonts/NotoSansJP-VariableFont_wght.ttf");

/// アプリケーション設定。起動時のコマンドにする。
#[derive(Default)]
pub struct AppOption {
    pub fullscreen: bool,
    pub debug: bool,
    pub touchpad: bool,
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
}

impl Application {
    pub fn new(option: AppOption) -> Self {
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
            option,
            compute: None,
        }
    }
}

impl ApplicationHandler for Application {
    fn resumed(&mut self, event_loop: &winit::event_loop::ActiveEventLoop) {
        if self.window.is_some() {
            return;
        }

        let window = Arc::new(
            event_loop
                .create_window(
                    if self.option.fullscreen {
                        Window::default_attributes().with_fullscreen(Some(winit::window::Fullscreen::Borderless(None)))
                    } else {
                        Window::default_attributes()
                    })
                .unwrap(),
        );

        window
            .set_cursor_grab(winit::window::CursorGrabMode::Confined)
            .ok();
        window.set_cursor_visible(false);

        let font = FontArc::try_from_slice(FONT_BYTES).expect("フォント読み込み失敗");
        let gpu = pollster::block_on(GpuContext::new(Arc::clone(&window)));
        let pipelines = PipelineRegistry::new(&gpu.device, &gpu.config);
        let world = World::new(
            gpu.config.width as f32 / gpu.config.height as f32,
            if self.option.touchpad { 0.03 } else { 0.003 },
        );
        let camera_gpu = CameraGpu::new(
            &gpu.device,
            &pipelines.camera_uniform_bind_group_layout,
            &world.camera,
        );
        let render = RenderInfo::new(&gpu.device, &gpu.config);
        let brush = BrushBuilder::using_font(font).build(
            &gpu.device,
            gpu.config.width,
            gpu.config.height,
            gpu.config.format,
        );
        
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
                if key_event.physical_key == PhysicalKey::Code(KeyCode::Escape) {
                    event_loop.exit();
                }
                
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
                if let (Some(gpu), Some(render_info)) = (&mut self.gpu, &mut self.render) {
                    gpu.resize(physical_size, render_info);
                }
            }
            WindowEvent::RedrawRequested => {
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
                    pipelines.update_general_uniform(&gpu.queue, time);
                    world.update(dt, &gpu.device, &pipelines.storage_bind_group_layout, compute, &gpu.queue);
                    camera_gpu.update(&gpu.queue, &world.camera);
                    let _delta = self.fps.tick();
                    let cp = world.player.current_chunk_pos();
                    let mut chunk_uniforms = vec![ChunkUniforms::new(world.seed); BATCH_SIZE];
                    chunk_uniforms[0] = ChunkUniforms {
                        chunk_pos: [cp.x, cp.y, cp.z],
                        seed: world.seed,
                    };
                    compute.update(&gpu.device, &gpu.queue, &chunk_uniforms);

                    let mut current_temp = 0.0;
                    let mut current_humid = 0.0;
                    if let Some(envs) = compute.get_env(&gpu.device) {
                        let player_block_pos = world.player.position.as_ivec3();
                        let lx = player_block_pos.x.rem_euclid(32) as usize;
                        let ly = player_block_pos.y.rem_euclid(32) as usize;
                        let lz = player_block_pos.z.rem_euclid(32) as usize;
                        let index = ly * 1024 + lx * 32 + lz;
                        if index < envs[0].len() {
                            let packed = envs[0][index];
                            let temp_bits = (packed & 0xffff) as u16;
                            let humid_bits = ((packed >> 16) & 0xffff) as u16;
                            current_temp = f16::from_bits(temp_bits).to_f32();
                            current_humid = f16::from_bits(humid_bits).to_f32();
                        }
                    }

                    gpu.render(
                        render,
                        pipelines,
                        camera_gpu,
                        &world.terrain,
                        &world.camera,
                        &self.fps,
                        brush,
                        current_temp,
                        current_humid,
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
