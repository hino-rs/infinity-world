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

// use tract_onnx::prelude::*;

// fn main() -> TractResult<()> {
//     println!("Loading tiny_terrain.onnx model...");
//     // ONNXモデルをロード
//     let model = tract_onnx::onnx()
//         // 入力元のONNXファイルをロード
//         .model_for_path("ai/tiny_terrain.onnx")?
//         // 入力のテンソルの形状(Shape)と型(Type)を定義
//         // 今回のモデルは [batch, channel, height, width] = [1, 1, 16, 16] の f32
//         .with_input_fact(0, f32::fact(&[1, 1, 16, 16]).into())?
//         // 最適化を実行
//         .into_optimized()?
//         // 推論を実行するための runnable な状態にする
//         .into_runnable()?;

//     // 入力テンソルの作成
//     // tract_ndarrayを使って、[1, 1, 16, 16]の入力データを用意します
//     // テスト用にグラデーション値を埋め込みます
//     let input_array = tract_ndarray::Array4::from_shape_fn((1, 1, 16, 16), |(_, _, y, x)| {
//         (y + x) as f32 / 30.0
//     });

//     println!("--- 入力データの一部 (16x16の最初の行) ---");
//     for x in 0..16 {
//         print!("{:.3} ", input_array[[0, 0, 0, x]]);
//     }
//     println!("\n");

//     let input_tensor: Tensor = input_array.into();

//     // 推論の実行
//     let result = model.run(tvec!(input_tensor.into()))?;

//     // 出力結果の取り出し
//     let output_tensor = &result[0];
//     let output_array = output_tensor.to_array_view::<f32>()?;

//     println!("--- 出力データの一部 (16x16の最初の行) ---");
//     for x in 0..16 {
//         print!("{:.3} ", output_array[[0, 0, 0, x]]);
//     }
//     println!("\n");

//     println!("モデルの実行テストが成功しました！");
//     Ok(())
// }
