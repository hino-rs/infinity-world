#![allow(unused)]

use glam::{IVec3,Vec3};

/// 地点A,Bのマンハッタン距離を返す(i32)
pub fn manhattan_distance(pos1: IVec3, pos2: IVec3) -> i32 {
    (pos1.x - pos2.x).abs() + (pos1.y - pos2.y).abs() + (pos1.z - pos2.z).abs()
}

/// 地点A,Bのユークリッド距離を返す(i32)
pub fn euclidean_distance(pos1: IVec3, pos2: IVec3) -> i32 {
    pos1.distance_squared(pos2)
}

/// firstが左下手前、endが右上奥
pub struct Aabb {
    pub first: Vec3,
    pub end: Vec3,
}

/// AABB全頂点
pub struct AabbFull {
    pub min_x: f32,
    pub max_x: f32,
    pub min_y: f32,
    pub max_y: f32,
    pub min_z: f32,
    pub max_z: f32,
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

fn hash2d(p: glam::Vec2, seed: u32) -> f32 {
    let ip_x = p.x.floor() as i32 as u32;
    let ip_y = p.y.floor() as i32 as u32;
    let s = seed;

    let mut vx = ip_x ^ s;
    let mut vy = ip_y ^ s;

    vx = vx.wrapping_mul(1664525).wrapping_add(1013904223);
    vy = vy.wrapping_mul(1664525).wrapping_add(1013904223);

    vx = vx.wrapping_add(vy.wrapping_mul(1103515245));
    vy = vy.wrapping_add(vx.wrapping_mul(1103515245));

    vx ^= vx >> 16;
    vy ^= vy >> 16;

    vx = vx.wrapping_add(vy.wrapping_mul(1103515245));
    vy = vy.wrapping_add(vx.wrapping_mul(1103515245));

    vx ^= vx >> 16;
    vy ^= vy >> 16;

    (vx as f64 * (1.0 / 4294967295.0)) as f32
}

fn get_grad(p: glam::Vec2, seed: u32) -> glam::Vec2 {
    let h = ((hash2d(p, seed) * 8.0) as u32) & 7;
    match h {
        0 => glam::Vec2::new(1.0, 0.0),
        1 => glam::Vec2::new(-1.0, 0.0),
        2 => glam::Vec2::new(0.0, 1.0),
        3 => glam::Vec2::new(0.0, -1.0),
        4 => glam::Vec2::new(0.70710678, 0.70710678),
        5 => glam::Vec2::new(-0.70710678, 0.70710678),
        6 => glam::Vec2::new(0.70710678, -0.70710678),
        _ => glam::Vec2::new(-0.70710678, -0.70710678),
    }
}

pub fn simplex_noise(x: f32, z: f32, seed: u32) -> f32 {
    let f2 = 0.366025403_f32;
    let g2 = 0.211324865_f32;

    let p = glam::Vec2::new(x, z);
    let s = (p.x + p.y) * f2;
    let ips = glam::Vec2::new((p.x + s).floor(), (p.y + s).floor());
    let t = (ips.x + ips.y) * g2;
    let p0 = ips - glam::Vec2::new(t, t);
    let d0 = p - p0;

    let i1 = if d0.x > d0.y {
        glam::Vec2::new(1.0, 0.0)
    } else {
        glam::Vec2::new(0.0, 1.0)
    };

    let d1 = d0 - i1 + glam::Vec2::new(g2, g2);
    let d2 = d0 - glam::Vec2::new(1.0, 1.0) + glam::Vec2::new(2.0 * g2, 2.0 * g2);

    let g0 = get_grad(ips, seed);
    let g1 = get_grad(ips + i1, seed);
    let g2 = get_grad(ips + glam::Vec2::new(1.0, 1.0), seed);

    let mut n0 = 0.0;
    let mut n1 = 0.0;
    let mut n2 = 0.0;

    let t0 = 0.5 - d0.dot(d0);
    if t0 > 0.0 {
        let t0_2 = t0 * t0;
        n0 = t0_2 * t0_2 * g0.dot(d0);
    }

    let t1 = 0.5 - d1.dot(d1);
    if t1 > 0.0 {
        let t1_2 = t1 * t1;
        n1 = t1_2 * t1_2 * g1.dot(d1);
    }

    let t2 = 0.5 - d2.dot(d2);
    if t2 > 0.0 {
        let t2_2 = t2 * t2;
        n2 = t2_2 * t2_2 * g2.dot(d2);
    }

    let val = 70.0 * (n0 + n1 + n2);
    val * 0.5 + 0.5
}

const CLIMATE_SCALE: f32 = 65536.0;
const MIN_TEMP: f32 = -30.0;
const MAX_TEMP: f32 = 30.0;

pub fn get_climate(wx: f32, wz: f32, seed: u32) -> (f32, f32) {
    let sc_x = wx / CLIMATE_SCALE;
    let sc_z = wz / CLIMATE_SCALE;
    let r = simplex_noise(sc_x, sc_z, seed.wrapping_add(5));
    let temp = MIN_TEMP + r * (MAX_TEMP - MIN_TEMP) + 10.0;
    (temp, r)
}

pub fn get_wind(wx: f32, wz: f32, seed: u32) -> (f32, f32) {
    let sc_x = wx / CLIMATE_SCALE;
    let sc_z = wz / CLIMATE_SCALE;
    let r = simplex_noise(sc_x, sc_z, seed.wrapping_add(7));
    let dir = r * 6.28318530718_f32;
    let vol = simplex_noise(sc_x, sc_z, seed.wrapping_add(7)) * 5.0;
    (dir, vol)
}
