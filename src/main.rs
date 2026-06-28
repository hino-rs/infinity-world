mod camera;
mod game;
mod state;
mod terrain;

use std::sync::Arc;
use std::time::Instant;
use winit::{
    application::ApplicationHandler, event::WindowEvent, event_loop::{ActiveEventLoop, ControlFlow, EventLoop}, window::{Window, WindowId},
};

use crate::state::State;

fn main() {
    env_logger::init();

    let event_loop = EventLoop::new().unwrap();
    event_loop.set_control_flow(ControlFlow::Poll);
    let mut app = App::default();

    event_loop.run_app(&mut app).unwrap();
}

struct App {
    window: Option<Arc<Window>>,
    state: Option<State>,
    last_render_time: Instant,
}

impl Default for App {
    fn default() -> Self {
        Self {
            window: None,
            state: None,
            last_render_time: Instant::now(),
        }
    }
}

impl ApplicationHandler for App {
    fn resumed(&mut self, event_loop: &ActiveEventLoop) {
        let window = Arc::new(
            event_loop
                .create_window(Window::default_attributes().with_fullscreen(Some(winit::window::Fullscreen::Borderless(None))))
                .unwrap(),
        );

        // マウスのキャプチャ（FPSゲームのように画面に固定＆非表示化）
        window
            .set_cursor_grab(winit::window::CursorGrabMode::Confined)
            .ok();
        window.set_cursor_visible(false);

        let state = pollster::block_on(State::new(Arc::clone(&window)));

        self.window = Some(window);
        self.state = Some(state);
        self.last_render_time = Instant::now();
    }

    fn window_event(
        &mut self,
        event_loop: &ActiveEventLoop,
        _window_id: WindowId,
        event: WindowEvent,
    ) {
        match event {
            WindowEvent::CloseRequested => {
                event_loop.exit();
            }

            WindowEvent::KeyboardInput {
                event: key_event, ..
            } => {
                // Escapeキーで終了
                if key_event.physical_key
                    == winit::keyboard::PhysicalKey::Code(winit::keyboard::KeyCode::Escape)
                {
                    event_loop.exit();
                }

                // キーボード入力をカメラコントローラーに送る
                if let Some(state) = &mut self.state {
                    if let winit::keyboard::PhysicalKey::Code(keycode) = key_event.physical_key {
                        state
                            .camera_controller
                            .process_keyboard(keycode, key_event.state.is_pressed());
                    }
                }
            }

            WindowEvent::Resized(physical_size) => {
                if let Some(state) = &mut self.state {
                    state.resize(physical_size);
                }
            }

            WindowEvent::RedrawRequested => {
                let now = Instant::now();
                let dt = now.duration_since(self.last_render_time).as_secs_f32();
                self.last_render_time = now;

                if let (Some(window), Some(state)) = (&mut self.window, &mut self.state) {
                    state.update(dt); // カメラ状態の更新
                    state.render();
                    window.request_redraw();
                }
            }

            _ => {}
        }
    }

    fn device_event(
        &mut self,
        _event_loop: &ActiveEventLoop,
        _device_id: winit::event::DeviceId,
        event: winit::event::DeviceEvent,
    ) {
        // マウスの相対移動量 (dx, dy) を取得してカメラを回転
        if let winit::event::DeviceEvent::MouseMotion { delta } = event {
            if let Some(state) = &mut self.state {
                state
                    .camera_controller
                    .process_mouse(delta.0, delta.1, &mut state.camera);
            }
        }
    }
}
