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
mod chunk;
mod compute;

use winit::event_loop::{ControlFlow, EventLoop};

use crate::app::{AppOption, Application};

fn main() {
    env_logger::init();
    let mut option = AppOption::default();
    let event_loop = EventLoop::new().unwrap();

    let args = std::env::args();
    args.for_each(|a| {
        match a.as_str() {
            "fullscreen" => option.fullscreen = true,
            "poll" => event_loop.set_control_flow(ControlFlow::Poll),
            "debug" => option.debug = true,
            "touch" => option.touchpad = true,
            "vsync" => option.vsync = true,
            "fullpower" => option.fullpower = true,
            _ => { if !a.contains(".exe") { println!("存在しないコマンド: {a}") } }
        }
    });

    let mut app = Application::new(option);

    event_loop.run_app(&mut app).unwrap();
}
