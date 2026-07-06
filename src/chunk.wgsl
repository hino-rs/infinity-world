const CHUNK_SIZE_U: u32 = 32;
const CHUNK_SIZE_I: i32 = i32(CHUNK_SIZE_U);
const CHUNK_SIZE_F: f32 = f32(CHUNK_SIZE_I);
const SCALE: f32 = 32.0;
const SEA_LEVEL: i32 = 10;
const DIRT_DEPTH: i32 = 4;

struct ChunkUniforms {
    chunk_pos: vec3<i32>,
    seed: i32,
}

@group(0) @binding(1) var<uniform> uniforms: ChunkUniforms;
@group(0) @binding(0) var<storage, read_write> blocks: array<u32>;

@compute
@workgroup_size(8, 8, 1)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let x = global_id.x;
    let z = global_id.y;

    if (x >= CHUNK_SIZE_U || z >= CHUNK_SIZE_U) {
        return;
    }

    let cx = uniforms.chunk_pos.x;
    let cy = uniforms.chunk_pos.y;
    let cz = uniforms.chunk_pos.z;
    let seed = uniforms.seed;

    let wx = f32(cx * 32 + i32(x));
    let wz = f32(cy * 32 + i32(z));

    let r = domain_warp(wx, 0.0, wz, seed);
    let h = i32(round(r * 16.0 + CHUNK_SIZE_F));

    for (var y = 0u; y < CHUNK_SIZE_U; y++) {
        let wy = uniforms.chunk_pos.y * CHUNK_SIZE_I + i32(y);
        let index = y * (CHUNK_SIZE_U * CHUNK_SIZE_U) + x * CHUNK_SIZE_U + z;

        if (wy <= h) {
            if wy == h {
                if h > 45 {
                    blocks[index] = 1u;
                } else {
                    blocks[index] = 3u;
                }
            } else if wy >= h - DIRT_DEPTH {
                blocks[index] = 2u;
            } else {
                blocks[index] = 1u;
            }
        } else if wy < SEA_LEVEL {
            blocks[index] = 100u;
        } else {
            blocks[index] = 0u;
        }
    }
}

// =======================================================
// ヘルパー
// =======================================================
fn fade(t: f32) -> f32 {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

// =======================================================
// ハッシュ
// =======================================================
fn hash(n: f32, seed: i32) -> f32 {
    return fract(sin(n) * 43758.5453123);
}

fn hash2d(p: vec2f, seed: i32) -> f32 {
    var p3 = fract(vec3f(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

fn hash3d(p: vec3f, seed: i32) -> f32 {
    let offset = vec3f(
        f32(seed) * 12.9898,
        f32(seed) * 78.233,
        f32(seed) * 45.164,
    );
    var p3 = fract((p + offset) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

// =======================================================
// ノイズ
// =======================================================
fn value_noise(x: f32, y: f32, z: f32, seed: i32) -> f32 {
    // 格子点の特定
    let x_grid = floor(x);
    let y_grid = floor(y);
    let z_grid = floor(z);

    // セル内の相対座標
    let x_frac = x - x_grid;
    let y_frac = y - y_grid;
    let z_frac = z - z_grid;

    // 補完用の重み
    let u = fade(x_frac);
    let v = fade(y_frac);
    let w = fade(z_frac);

    // 周辺8マスの格子点からランダムな値をサンプリング
    let v000 = hash3d(vec3f(x_grid,       y_grid,       z_grid),       seed);
    let v100 = hash3d(vec3f(x_grid + 1.0, y_grid,       z_grid),       seed);
    let v010 = hash3d(vec3f(x_grid,       y_grid + 1.0, z_grid),       seed);
    let v110 = hash3d(vec3f(x_grid + 1.0, y_grid + 1.0, z_grid),       seed);
    let v001 = hash3d(vec3f(x_grid,       y_grid,       z_grid + 1.0), seed);
    let v101 = hash3d(vec3f(x_grid + 1.0, y_grid,       z_grid + 1.0), seed);
    let v011 = hash3d(vec3f(x_grid,       y_grid + 1.0, z_grid + 1.0), seed);
    let v111 = hash3d(vec3f(x_grid + 1.0, y_grid + 1.0, z_grid + 1.0), seed);

    // 三次元線形補完
    // X軸に沿って
    let x00 = mix(v000, v100, u);
    let x10 = mix(v010, v110, u);
    let x01 = mix(v001, v101, u);
    let x11 = mix(v011, v111, u);

    // Y軸に沿って
    let y0 = mix(x00, x10, v);
    let y1 = mix(x01, x11, v);

    // Z軸に沿って最終出力
    return mix(y0, y1, w);
}

// =======================================================
// フラクタル合成
// =======================================================
fn fbm(x: f32, y: f32, z: f32, seed: i32, octaves: u32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var max_val = 0.0;

    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < octaves; i++) {
        let n = value_noise(x * frequency, y * frequency, z * frequency, seed + i32(i) * 131i);

        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    return sum / max_val;
}

// =======================================================
// ドメインワーピング
// =======================================================
fn domain_warp(x: f32, y: f32, z: f32, seed: i32) -> f32 {
    let sx = x / SCALE;
    let sy = y / SCALE;
    let sz = z / SCALE;

    let amplitude = 1.0;
    let dx = value_noise(sx, sy, sz, seed) * amplitude;
    let dy = value_noise(sx, sy, sz, seed + 1) * amplitude;
    let dz = value_noise(sx, sy, sz, seed + 2) * amplitude;

    let p = vec3f(sx + dx, sy + dy, sz + dz);

    return fbm(p.x, p.y, p.z, seed + 3, 4);
}
