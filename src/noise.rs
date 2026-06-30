#![allow(unused)]

use noise::{MultiFractal, NoiseFn};

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
