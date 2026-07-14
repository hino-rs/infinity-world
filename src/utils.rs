#![allow(unused)]

use glam::IVec3;

/// 地点A,Bのマンハッタン距離を返す(i32)
pub fn manhattan_distance(pos1: IVec3, pos2: IVec3) -> i32 {
    (pos1.x - pos2.x).abs() + (pos1.y - pos2.y).abs() + (pos1.z - pos2.z).abs()
}

/// 地点A,Bのユークリッド距離を返す(i32)
pub fn euclidean_distance(pos1: IVec3, pos2: IVec3) -> i32 {
    pos1.distance_squared(pos2)
}

/// 湿潤度と温度から(相対湿度, 絶対湿度)を返す
/// WGSL側と合わせる
pub fn calc_humidity(mois: f32, temp: f32) -> (f32, f32) {
    // 相対湿度 (%)
    let rh = mois * 100.0; 

    // 飽和水蒸気圧 (hPa)
    let es = if temp >= 0.0 {
        6.1078 * ((7.5 * temp) / (temp + 237.3)).powf(10.0)
    } else {
        6.1078 * ((9.5 * temp) / (temp + 265.5)).powf(10.0)
    };

    // 現在の水蒸気圧 (hPa)
    let e = es * (rh / 100.0); 

    // 絶対湿度 (g/m^3)
    let ah = 217.0 * e / (temp + 273.15); 

    (rh, ah)
}
