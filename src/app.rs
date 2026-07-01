use std::sync::Arc;

use wgpu_text::{BrushBuilder, TextBrush};
use wgpu_text::glyph_brush::ab_glyph::FontArc;
use winit::application::ApplicationHandler;
use winit::event::WindowEvent;
use winit::window::Window;
use winit::keyboard::{KeyCode, PhysicalKey};
use web_time::Instant;

use crate::camera::CameraGpu;
use crate::fps::FpsCounter;
use crate::gpu::GpuContext;
use crate::render_info::RenderInfo;
use crate::world::World;
use crate::pipeline::PipelineRegistry;

static FONT_BYTES: &[u8] = include_bytes!("../assets/fonts/NotoSansJP-VariableFont_wght.ttf");

pub struct Application {
    pub window:    Option<Arc<Window>>,
    pub gpu:       Option<GpuContext>,
    pub pipelines: Option<PipelineRegistry>,
    pub world:     Option<World>,
    pub last_render_time: Instant,
    pub camera_gpu: Option<CameraGpu>,
    pub time: Instant,
    pub render: Option<RenderInfo>,
    pub fps: FpsCounter,
    pub brush: Option<TextBrush<FontArc>>,
}

impl Application {
    pub fn new(_instance: wgpu::Instance) -> Self {
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
        }
    }
}

impl ApplicationHandler for Application {
    fn resumed(&mut self, event_loop: &winit::event_loop::ActiveEventLoop) {
        if self.window.is_some() { return; }

        let window = Arc::new(
            event_loop
                .create_window(Window::default_attributes())
                .unwrap(),
        );

        window
            .set_cursor_grab(winit::window::CursorGrabMode::Confined)
            .ok();
        window.set_cursor_visible(false);
        
        let font = FontArc::try_from_slice(FONT_BYTES).expect("フォント読み込み失敗");
        let gpu = pollster::block_on(GpuContext::new(Arc::clone(&window)));
        let world = World::new(&gpu.device, gpu.config.width as f32 / gpu.config.height as f32);
        let pipelines = PipelineRegistry::new(&gpu.device, &gpu.config);
        let camera_gpu = CameraGpu::new(&gpu.device, &pipelines.camera_uniform_bind_group_layout, &world.camera);        
        let render = RenderInfo::new(&gpu.device, &gpu.config);
        let brush = BrushBuilder::using_font(font).build(
            &gpu.device,
            gpu.config.width,
            gpu.config.height,
            gpu.config.format,
        );

        self.window = Some(window);
        self.gpu = Some(gpu);
        self.pipelines = Some(pipelines);
        self.world = Some(world);
        self.camera_gpu = Some(camera_gpu);
        self.render = Some(render);
        self.brush = Some(brush);
    }

    fn window_event(
        &mut self,
        event_loop: &winit::event_loop::ActiveEventLoop,
        _window_id: winit::window::WindowId,
        event: winit::event::WindowEvent,
    )
    {
        match event {
            WindowEvent::CloseRequested => {
                event_loop.exit();
            }
            WindowEvent::KeyboardInput { event: key_event, .. } => {
                if key_event.physical_key == PhysicalKey::Code(KeyCode::Escape) {
                    event_loop.exit();
                }

                if let Some(world) = &mut self.world {
                    if let PhysicalKey::Code(keycode) = key_event.physical_key {
                        world
                            .player_controller
                            .process_keyboard(keycode, key_event.state.is_pressed(), key_event.repeat);
                    }
                }
            }
            WindowEvent::Resized(physical_size) => {
                if let (Some(gpu), Some(render_info)) = (&mut self.gpu, &mut self.render) {
                    gpu.resize(physical_size, render_info);
                }
            }
            WindowEvent::RedrawRequested => {
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
                ) = (
                    &mut self.window, 
                    &mut self.world, 
                    &mut self.gpu,
                    &mut self.camera_gpu,
                    &self.pipelines,
                    &self.render,
                    &mut self.brush,
                ) {
                    let time = Instant::now().duration_since(self.time).as_secs_f32();
                    world.update(dt, &gpu.device);
                    pipelines.update_general_uniform(&gpu.queue, time);
                    camera_gpu.update(&gpu.queue, &world.camera);
                    let _delta = self.fps.tick();
                    gpu.render(render, pipelines, camera_gpu, &world.terrain.chunks, &world.camera, &self.fps, brush);
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
    )
    {
        // マウスの相対移動量 (dx, dy) を取得してカメラを回転
        if let winit::event::DeviceEvent::MouseMotion { delta } = event {
            if let Some(world) = &mut self.world {
                world
                    .camera
                    .process_mouse(delta.0, delta.1);
            }
        }
    }
}