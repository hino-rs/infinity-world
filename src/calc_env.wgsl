const CHUNK_SIZE_U: u32 = 32;
const CHUNK_SIZE_I: i32 = i32(CHUNK_SIZE_U);
const CHUNK_SIZE_F: f32 = f32(CHUNK_SIZE_I);
// const SCALE: f32 = 512.0;
const MOUNTAIN_HEIGHT: f32 = 256.0;
const SEA_LEVEL: i32 = 10;
const DIRT_DEPTH: i32 = 4;

// const MAX_TEMP: f32 = 60.0;
// const MIN_TEMP: f32 = -90.0;
const MAX_TEMP: f32 = 30.0;
const MIN_TEMP: f32 = -30.0;

const MAX_HEIGHT: f32 = 10000.0;
const MIN_HEIGT: f32 = 0.0;
const OCTAVES: u32 = 1;

// const SCALE: f32 = 65536.0;
// const SCALE: f32 = 32768.0;
const SCALE: f32 = pow(2.0, 16);

const TWO_PI: f32 = 6.28318530718;

struct ChunkUniforms {
    chunk_pos: vec3i,
    seed: i32,
}

struct EnvData {
    temp_and_mois: u32, // 気温と湿潤度
    wind_dir_and_speed: u32, // 風の向きと速度
}

@group(0) @binding(0) var<storage, read> uniforms: array<ChunkUniforms>;
@group(0) @binding(2) var<storage, read_write> env_storage: array<EnvData>;


fn calc_saturated_water(temp: f32) -> f32 {
    let t = clamp(temp, -50.0, 50.0);
    return max(4.85 * exp(0.06 * t), 0.001);
}

@compute
@workgroup_size(1, 1, 1)
fn main(@builtin(global_invocation_id) global_id: vec3u) {
    let chunk_idx = global_id.z;

    let cx = uniforms[chunk_idx].chunk_pos.x;
    let cy = uniforms[chunk_idx].chunk_pos.y;
    let cz = uniforms[chunk_idx].chunk_pos.z;
    let seed = uniforms[chunk_idx].seed;

    let wx = f32(cx * 32);
    let wz = f32(cz * 32);
    let sx = wx / SCALE;
    let sz = wz / SCALE;



    var env_data: EnvData;
    env_data.temp_and_mois = get_temp_and_mois(sx, sz, seed);
    env_data.wind_dir_and_speed = get_wind(sx, sz, seed);

    env_storage[chunk_idx] = env_data;
}

fn get_temp_and_mois(sx: f32, sz: f32, seed: i32) -> u32 {
    var r = fbm(sx, sz, seed + 5);
    let sealevel_temperature = mix(MIN_TEMP, MAX_TEMP, r) + 10.0;
    var moisture = r;
    return pack2x16float(vec2f(sealevel_temperature, moisture));
}

fn get_wind(sx: f32, sz: f32, seed: i32) -> u32 {
    let r = fbm(sx, sz, seed + 7);
    let dir = r * TWO_PI;
    let vol = fbm(sx, sz, seed + 7) * 5;
    return pack2x16float(vec2f(dir, vol));
}

fn hash2d(p: vec2f, seed: i32) -> f32 {
    let ip = vec2u(
        u32(i32(floor(p.x))),
        u32(i32(floor(p.y)))
    );
    let s = u32(seed);

    var v = ip ^ vec2u(s);
    v = v * 1664525u + 1013904223u;
    v.x += v.y * 1103515245u;
    v.y += v.x * 1103515245u;
    v ^= v >> vec2u(16u);
    v.x += v.y * 1103515245u;
    v.y += v.x * 1103515245u;
    v ^= v >> vec2u(16u);

    return f32(v.x) * (1.0 / 4294967295.0);
}

fn fade(t: f32) -> f32 {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

fn get_grad(p: vec2f, seed: i32) -> vec2f {
    let h = u32(hash2d(p, seed) * 8.0) & 7u;
    switch (h) {
        case 0u:  { return vec2f(1.0, 0.0); }
        case 1u:  { return vec2f(-1.0, 0.0); }
        case 2u:  { return vec2f(0.0, 1.0); }
        case 3u:  { return vec2f(0.0, -1.0); }
        case 4u:  { return vec2f(0.70710678, 0.70710678); }
        case 5u:  { return vec2f(-0.70710678, 0.70710678); }
        case 6u:  { return vec2f(0.70710678, -0.70710678); }
        default:  { return vec2f(-0.70710678, -0.70710678); }
    }
}

fn perlin_noise(x: f32, z: f32, seed: i32) -> f32 {
    let p = vec2f(x, z);
    let ip = floor(p);
    let fp = p - ip;

    let u = fade(fp.x);
    let v = fade(fp.y);

    let g00 = ip + vec2f(0.0, 0.0);
    let g10 = ip + vec2f(1.0, 0.0);
    let g01 = ip + vec2f(0.0, 1.0);
    let g11 = ip + vec2f(1.0, 1.0);

    let n00 = dot(get_grad(g00, seed), fp - vec2f(0.0, 0.0));
    let n10 = dot(get_grad(g10, seed), fp - vec2f(1.0, 0.0));
    let n01 = dot(get_grad(g01, seed), fp - vec2f(0.0, 1.0));
    let n11 = dot(get_grad(g11, seed), fp - vec2f(1.0, 1.0));

    let x0 = mix(n00, n10, u);
    let x1 = mix(n01, n11, u);

    let val = mix(x0, x1, v);
    return val * 0.5 + 0.5;
}

fn simplex_noise(x: f32, z: f32, seed: i32) -> f32 {
    let F2 = 0.366025403;
    let G2 = 0.211324865;

    let p = vec2f(x, z);
    let s = (p.x + p.y) * F2;
    let ips = floor(p + s);
    let t = (ips.x + ips.y) * G2;
    let p0 = ips - t;
    let d0 = p - p0;

    var i1: vec2f;
    if (d0.x > d0.y) {
        i1 = vec2f(1.0, 0.0);
    } else {
        i1 = vec2f(0.0, 1.0);
    }

    let d1 = d0 - i1 + G2;
    let d2 = d0 - vec2f(1.0, 1.0) + 2.0 * G2;

    let g0 = get_grad(ips, seed);
    let g1 = get_grad(ips + i1, seed);
    let g2 = get_grad(ips + vec2f(1.0, 1.0), seed);

    var n0 = 0.0;
    var n1 = 0.0;
    var n2 = 0.0;

    let t0 = 0.5 - dot(d0, d0);
    if (t0 > 0.0) {
        let t0_2 = t0 * t0;
        n0 = t0_2 * t0_2 * dot(g0, d0);
    }

    let t1 = 0.5 - dot(d1, d1);
    if (t1 > 0.0) {
        let t1_2 = t1 * t1;
        n1 = t1_2 * t1_2 * dot(g1, d1);
    }

    let t2 = 0.5 - dot(d2, d2);
    if (t2 > 0.0) {
        let t2_2 = t2 * t2;
        n2 = t2_2 * t2_2 * dot(g2, d2);
    }

    let val = 70.0 * (n0 + n1 + n2);
    return val * 0.5 + 0.5;
}

fn fbm(x: f32, z: f32, seed: i32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var max_val = 0.0;

    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < OCTAVES; i++) {
        let n = simplex_noise(x * frequency, z * frequency, seed + i32(i) * 131i);

        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    return sum / max_val;
}