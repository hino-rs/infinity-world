#![allow(unused)]

use crate::consts::*;
use glam::DVec3;
use noise::{MultiFractal, NoiseFn};
use std::hash::Hash;

// =============================================================
// ヘルパー
// =============================================================
/// 線形補完
#[inline(always)]
fn lerp(a: f64, b: f64, t: f64) -> f64 {
    a + t * (b - a)
}

// =============================================================
// ベースノイズ
// =============================================================
#[inline(always)]
pub fn value_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    noise::Value::new(seed).get([x, y, z])
}

#[inline(always)]
pub fn perlin_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    noise::Perlin::new(seed).get([x, y, z])
}

#[inline(always)]
pub fn open_simplex_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    noise::OpenSimplex::new(seed).get([x, y, z])
}

// 特徴点ベース
#[inline(always)]
pub fn worley_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    noise::Worley::new(seed).get([x, y, z])
}

// 特定の向きと細かさを持った小さな波形をばらまいて合成
#[inline(always)]
pub fn gabor_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    todo!()
}

// Perlinノイズの欠点であるエイリアシングやディテールの喪失を抑える
#[inline(always)]
pub fn wavelet_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    todo!()
}

// =============================================================
// フラクタル合成
// =============================================================
#[inline(always)]
pub fn get_ridged(x: f64, y: f64, z: f64, seed: u32, octaves: usize) -> f64 {
    noise::RidgedMulti::<noise::OpenSimplex>::new(seed)
        .set_octaves(octaves)
        .get([x, y, z])
}

#[inline(always)]
pub fn get_billow(x: f64, y: f64, z: f64, seed: u32, octaves: usize) -> f64 {
    noise::Billow::<noise::OpenSimplex>::new(seed)
        .set_octaves(octaves)
        .get([x, y, z])
}

#[inline(always)]
pub fn get_fbm(x: f64, y: f64, z: f64, seed: u32, octaves: u32) -> f64 {
    let mut sum = 0.0;
    let mut amplitude = 0.5;
    let mut frequency = 1.0;
    let mut max_val = 0.0;

    // 空隙性
    let lacunarity = 2.0;
    // 持続度
    let persistence = 0.5;

    for i in 0..octaves {
        // let n = value_noise(x * frequency, y * frequency, z * frequency, seed + i * 131);
        // let n = perlin_noise(x * frequency, y * frequency, z * frequency, seed + i * 131);
        let n = open_simplex_noise(x * frequency, y * frequency, z * frequency, seed + i * 131);
        // let n = ridged_perlin(x * frequency, y * frequency, z * frequency, seed + i * 131);

        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    sum / max_val
}

// ベースノイズの値が大きい場所ほど高周波をより激しく重ねる
#[inline(always)]
pub fn get_heterogeneous() -> f64 {
    todo!();
}

// 工程さデータに対して周期的な縞模様を適用する
#[inline(always)]
pub fn get_strata() -> f64 {
    todo!();
}

// 連続的なノイズのグラデーションを段階的に区切る
#[inline(always)]
pub fn get_terraced() -> f64 {
    todo!();
}

// worlenノイズを何層も細かくして重ねる
#[inline(always)]
pub fn get_voronoi() -> f64 {
    todo!();
}

// =============================================================
// ドメインワーピング系
// =============================================================
#[inline(always)]
pub fn domain_warp(x: f64, y: f64, z: f64, seed: u32, amplitude: f64, scale: f64) -> f64 {
    // ノイズ空間を拡大するため
    let x = x / scale;
    let y = y / scale;
    let z = z / scale;

    let dx = perlin_noise(x, y, z, seed) * amplitude;
    let dy = perlin_noise(x, y, z, seed + 1) * amplitude;
    let dz = perlin_noise(x, y, z, seed + 2) * amplitude;

    let p = DVec3::new(x + dx, y + dy, z + dz);

    get_fbm(p.x, p.y, p.z, seed + 3, 4)
    // (get_fbm(p.x, p.y, p.z, seed+3, 4) * CHUNK_SIZE_F64 + SEA_LEVEL as f64).round() as i32
}

/// 特定の方向に歪ませる
#[inline(always)]
pub fn directional_warping() -> i32 {
    todo!();
}

// ワーピング値を意図的に量子化する
#[inline(always)]
pub fn quantized_warping() -> i32 {
    todo!();
}

// 座標の変形処理に段階関数を直接組み込むことで不連続にズラす
#[inline(always)]
pub fn stepped_warping() -> i32 {
    todo!();
}

// 特定の中心点からの距離に応じて座標空間を円周方向に回転させる
#[inline(always)]
pub fn vortex_warping() -> i32 {
    todo!();
}

// 指定した軸に沿って進むほど回転角を大きくすることで螺旋を作る
#[inline(always)]
pub fn twist_warping() -> i32 {
    todo!();
}
