mod camera;
mod game;
mod create_terrain;
mod noise;
mod consts;
mod player;
mod terrain;
mod world;
mod gpu;
mod pipeline;
mod app;
mod render_info;
mod fps;
mod utils;

use winit::event_loop::{ControlFlow, EventLoop};

use crate::{app::Application};

fn main() {
    env_logger::init();

    let event_loop = EventLoop::new().unwrap();
    event_loop.set_control_flow(ControlFlow::Poll);
    let instance = wgpu::Instance::default();
    let mut app = Application::new(instance);

    event_loop.run_app(&mut app).unwrap();
}
