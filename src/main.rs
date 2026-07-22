mod app;
mod camera;
mod chunk;
mod compute;
mod consts;
mod create_terrain;
mod fps;
mod game;
mod gpu;
mod noise;
mod pipeline;
mod player;
mod render_info;
mod terrain;
mod types;
mod utils;
mod world;

use winit::event_loop::{ControlFlow, EventLoop};

use crate::app::{AppOption, Application};

fn main() {
    env_logger::init();
    let mut option = AppOption::default();
    let event_loop = EventLoop::new().unwrap();

    let args = std::env::args();
    args.for_each(|a| match a.as_str() {
        "fullscreen" => option.fullscreen = true,
        "poll" => event_loop.set_control_flow(ControlFlow::Poll),
        "debug" => option.debug = true,
        "touch" => option.touchpad = true,
        "vsync" => option.vsync = true,
        "fullpower" => option.fullpower = true,
        _ => {
            if !a.contains(".exe") {
                println!("存在しないコマンド: {a}")
            }
        }
    });

    let mut app = Application::new(Some(option));

    event_loop.run_app(&mut app).unwrap();
}

#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen_futures::js_sys;

#[cfg(target_arch = "wasm32")]
pub use wasm_bindgen_rayon::init_thread_pool;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(start)]
pub async fn run() {
    console_error_panic_hook::set_once();

    if let Some(web_window) = web_sys::window() {
        let _ = wasm_logger::init(wasm_logger::Config::default());
        use std::sync::Arc;
        use winit::window::Window;

        log::info!("[Start] Initializing WebAssembly app...");

        let concurrency = (web_window.navigator().hardware_concurrency() as usize).min(4).max(1);
        let is_isolated = js_sys::Reflect::get(&web_window, &"crossOriginIsolated".into())
            .ok()
            .and_then(|v| v.as_bool())
            .unwrap_or(false);

        if is_isolated && concurrency > 1 {
            log::info!("[Step 1] Initializing Rayon thread pool (concurrency={})...", concurrency);
            if let Err(e) = wasm_bindgen_rayon::init_thread_pool(concurrency).await {
                log::error!("[Step 1 Error] Failed to initialize rayon thread pool: {:?}", e);
            }
            log::info!("[Step 1 Success] Rayon thread pool initialized.");
        } else {
            log::info!("[Step 1] CrossOriginIsolated is false or concurrency=1; skipping thread pool initialization.");
        }

        use winit::platform::web::EventLoopExtWebSys;
        use winit::platform::web::WindowAttributesExtWebSys;
        use wasm_bindgen::JsCast;

        log::info!("[Step 2] Creating EventLoop...");
        let event_loop = match EventLoop::new() {
            Ok(el) => el,
            Err(e) => {
                log::error!("[Step 2 Error] Failed to create EventLoop: {:?}", e);
                return;
            }
        };

        log::info!("[Step 3] Creating canvas...");
        let canvas = web_window
            .document()
            .and_then(|doc| doc.create_element("canvas").ok())
            .and_then(|c| c.dyn_into::<web_sys::HtmlCanvasElement>().ok());

        if let Some(canvas) = &canvas {
            // ブラウザウィンドウサイズを取得してキャンバスに明示的に設定
            // これがないと window.inner_size() が 0x0 を返す
            let dpr = web_window.device_pixel_ratio();
            let client_width = web_window.inner_width()
                .ok().and_then(|v| v.as_f64()).unwrap_or(800.0);
            let client_height = web_window.inner_height()
                .ok().and_then(|v| v.as_f64()).unwrap_or(600.0);
            canvas.set_width((client_width * dpr) as u32);
            canvas.set_height((client_height * dpr) as u32);
            let style = canvas.style();
            let _ = style.set_property("width", "100%");
            let _ = style.set_property("height", "100%");

            if let Some(doc) = web_window.document() {
                if let Some(body) = doc.body() {
                    let _ = body.append_child(canvas);
                }
            }
        }

        log::info!("[Step 4] Creating window...");
        let window_attrs = Window::default_attributes()
            .with_title("Infinity World")
            .with_canvas(canvas);

        let window = match event_loop.create_window(window_attrs) {
            Ok(w) => Arc::new(w),
            Err(e) => {
                log::error!("[Step 4 Error] Failed to create window: {:?}", e);
                return;
            }
        };

        log::info!("[Step 5] Creating GPU Context...");
        let gpu = crate::gpu::GpuContext::new(Arc::clone(&window), false, false).await;
        log::info!("[Step 5 Success] GPU Context created.");

        log::info!("[Step 6] Spawning application loop...");
        let app = Application::with_precreated(window, gpu);
        event_loop.spawn_app(app);
        log::info!("[Step 6 Success] App spawned.");
    }
}

