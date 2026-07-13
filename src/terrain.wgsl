const CHUNK_SIZE_U: u32 = 32;
const CHUNK_SIZE_I: i32 = i32(CHUNK_SIZE_U);
const CHUNK_SIZE_F: f32 = f32(CHUNK_SIZE_I);
const SCALE: f32 = 1024.0;
const MOUNTAIN_HEIGHT: f32 = 128.0;
const SEA_LEVEL: i32 = 10;
const DIRT_DEPTH: i32 = 4;

struct ChunkUniforms {
    chunk_pos: vec3i,
    seed: i32,
}

@group(0) @binding(0) var<storage, read> uniforms: array<ChunkUniforms>;
@group(0) @binding(1) var<storage, read_write> blocks: array<u32>;
@group(0) @binding(2) var<storage, read_write> env_data: array<u32>;

struct Biome {
    temp: f32,
    humid: f32,
    block_id: u32,
}

const BIOME_COUNT = 5u;
const BIOMES = array<Biome, 5>(
    Biome(25.0, 82.5, 67), // 熱帯雨林
    Biome(22.5, 25.0, 7), // 熱帯
    Biome(12.5, 67.5, 3), // 温帯
    Biome(0.0, 75.0, 61), // 亜寒帯
    Biome(-10.0, 82.5, 103), // 極寒
);

fn get_biome_id(t: f32, h: f32) -> u32 {
    var min_distance = 9999.0;
    var closest_id = 0u;

    for (var i = 0u; i < BIOME_COUNT; i = i + 1u) {
        var b = BIOMES[i];
        let dt = b.temp - t;
        let dh = b.humid - h;
        let distance = dt*dt + dh*dh;

        if (distance < min_distance) {
            min_distance = distance;
            closest_id = b.block_id;
        }
    }
    return closest_id;
}

// ===================================================================
// チャンク生成
// ===================================================================
@compute
@workgroup_size(8, 8, 1)
fn main(@builtin(global_invocation_id) global_id: vec3u) {
    let x = global_id.x;
    let z = global_id.y;
    let chunk_idx = global_id.z;

    if (x >= CHUNK_SIZE_U || z >= CHUNK_SIZE_U) {
        return;
    }

    let cx = uniforms[chunk_idx].chunk_pos.x;
    let cy = uniforms[chunk_idx].chunk_pos.y;
    let cz = uniforms[chunk_idx].chunk_pos.z;
    let seed = uniforms[chunk_idx].seed;

    let wx = f32(cx * 32 + i32(x));
    let wz = f32(cz * 32 + i32(z));

    let r = domain_warp(wx, 0.0, wz, seed);
    let h = i32(round(r * MOUNTAIN_HEIGHT));

    let chunk_offset = chunk_idx * (CHUNK_SIZE_U * CHUNK_SIZE_U * CHUNK_SIZE_U);

    for (var y = 0u; y < CHUNK_SIZE_U; y++) {
        let wy = uniforms[chunk_idx].chunk_pos.y * CHUNK_SIZE_I + i32(y);
        let index = chunk_offset + y * (CHUNK_SIZE_U * CHUNK_SIZE_U) + x * CHUNK_SIZE_U + z;

        // x: 気温, y: 湿度%
        let env = unpack2x16float(env_data[index]);

        if (wy <= h) {
            blocks[index] = get_biome_id(env.x, env.y);
            
            // if wy == h {
            //     if h > 45 {
            //         // blocks[index] = 1u;
            //         if env.x < 21.0 {
            //             blocks[index] = 1u;
            //         } else {
            //             blocks[index] = 1u;
            //         }
            //     } else {
            //         // blocks[index] = 3u;
            //         if env.x < 21.0 {
            //             blocks[index] = 1u;
            //         } else {
            //             blocks[index] = 1u;
            //         }
            //     }
            // } else if wy >= h - DIRT_DEPTH {
            //     // blocks[index] = 2u;
            //     if env.x < 21.0 {
            //         blocks[index] = 1u;
            //     } else {
            //         blocks[index] = 1u;
            //     }
            // } else {
            //     // blocks[index] = 1u;
            //     if env.x < 21.0 {
            //         blocks[index] = 1u;
            //     } else {
            //         blocks[index] = 1u;
            //     }
            // }
        } else if wy < SEA_LEVEL {
            blocks[index] = 100u;
        } else {
            blocks[index] = 0u;
        }
    }
}

// ===================================================================
// バイオームシステム
// マインクラフトのようにバイオームの直接的な分布はせず、
// 気温・湿度・降水量・風量・地質・岩石の性質・地下水・土壌・植生や、
// 日射量といった要素を分布させ、結果的なバイオームを作りたい。
// ブロックをそれらに依存させるなら、斜面の傾斜角も考慮したい。
// ===================================================================
fn biome(x: f32, y: f32, z: f32, seed: i32) {
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
    let ip = vec3u(
        u32(i32(floor(p.x))),
        u32(i32(floor(p.y))),
        u32(i32(floor(p.z)))
    );
    let s = u32(seed);

    var v = ip ^ vec3u(s);
    v = v * 1664525u + 1013904223u;
    v.x += v.y * v.z;
    v.y += v.z * v.x;
    v.z += v.x * v.y;
    v ^= v >> vec3u(16u);
    v.x += v.y * v.z;
    v.y += v.z * v.x;
    v.z += v.x * v.y;
    v ^= v >> vec3u(16u);

    return f32(v.x) * (1.0 / 4294967295.0);
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

fn get_grad(p: vec3f, seed: i32) -> vec3f {
    let h = u32(hash3d(p, seed) * 16.0) & 15u;
    switch (h) {
        case 0u:  { return vec3f(1.0, 1.0, 0.0); }
        case 1u:  { return vec3f(-1.0, 1.0, 0.0); }
        case 2u:  { return vec3f(1.0, -1.0, 0.0); }
        case 3u:  { return vec3f(-1.0, -1.0, 0.0); }
        case 4u:  { return vec3f(1.0, 0.0, 1.0); }
        case 5u:  { return vec3f(-1.0, 0.0, 1.0); }
        case 6u:  { return vec3f(1.0, 0.0, -1.0); }
        case 7u:  { return vec3f(-1.0, 0.0, -1.0); }
        case 8u:  { return vec3f(0.0, 1.0, 1.0); }
        case 9u:  { return vec3f(0.0, -1.0, 1.0); }
        case 10u: { return vec3f(0.0, 1.0, -1.0); }
        case 11u: { return vec3f(0.0, -1.0, -1.0); }
        case 12u: { return vec3f(1.0, 1.0, 0.0); }
        case 13u: { return vec3f(-1.0, 1.0, 0.0); }
        case 14u: { return vec3f(0.0, -1.0, 1.0); }
        default:  { return vec3f(0.0, -1.0, -1.0); }
    }
}

fn get_cell_point(cell: vec3f, seed: i32) -> vec3f {
    let x_hash = hash3d(cell, seed);
    let y_hash = hash3d(cell, seed + 1357);
    let z_hash = hash3d(cell, seed + 2468);
    return vec3f(x_hash, y_hash, z_hash);
}

fn perlin_noise(x: f32, y: f32, z: f32, seed: i32) -> f32 {
    let p = vec3f(x, y, z);
    let ip = floor(p);
    let fp = p - ip;

    let u = fade(fp.x);
    let v = fade(fp.y);
    let w = fade(fp.z);

    let g000 = ip + vec3f(0.0, 0.0, 0.0);
    let g100 = ip + vec3f(1.0, 0.0, 0.0);
    let g010 = ip + vec3f(0.0, 1.0, 0.0);
    let g110 = ip + vec3f(1.0, 1.0, 0.0);
    let g001 = ip + vec3f(0.0, 0.0, 1.0);
    let g101 = ip + vec3f(1.0, 0.0, 1.0);
    let g011 = ip + vec3f(0.0, 1.0, 1.0);
    let g111 = ip + vec3f(1.0, 1.0, 1.0);

    let n000 = dot(get_grad(g000, seed), fp - vec3f(0.0, 0.0, 0.0));
    let n100 = dot(get_grad(g100, seed), fp - vec3f(1.0, 0.0, 0.0));
    let n010 = dot(get_grad(g010, seed), fp - vec3f(0.0, 1.0, 0.0));
    let n110 = dot(get_grad(g110, seed), fp - vec3f(1.0, 1.0, 0.0));
    let n001 = dot(get_grad(g001, seed), fp - vec3f(0.0, 0.0, 1.0));
    let n101 = dot(get_grad(g101, seed), fp - vec3f(1.0, 0.0, 1.0));
    let n011 = dot(get_grad(g011, seed), fp - vec3f(0.0, 1.0, 1.0));
    let n111 = dot(get_grad(g111, seed), fp - vec3f(1.0, 1.0, 1.0));

    let x00 = mix(n000, n100, u);
    let x10 = mix(n010, n110, u);
    let x01 = mix(n001, n101, u);
    let x11 = mix(n011, n111, u);

    let y0 = mix(x00, x10, v);
    let y1 = mix(x01, x11, v);

    let val = mix(y0, y1, w);
    return val * 0.5 + 0.5;
}

fn simplex_noise(x: f32, y: f32, z: f32, seed: i32) -> f32 {
    let F3 = 0.333333333;
    let G3 = 0.166666667;

    let p = vec3f(x, y, z);
    let s = (p.x + p.y + p.z) * F3;
    let ips = floor(p + s);
    let t = (ips.x + ips.y + ips.z) * G3;
    let p0 = ips - t;
    let d0 = p - p0;

    var i1: vec3f;
    var i2: vec3f;

    if (d0.x >= d0.y) {
        if (d0.y >= d0.z) {
            i1 = vec3f(1.0, 0.0, 0.0);
            i2 = vec3f(1.0, 1.0, 0.0);
        } else if (d0.x >= d0.z) {
            i1 = vec3f(1.0, 0.0, 0.0);
            i2 = vec3f(1.0, 0.0, 1.0);
        } else {
            i1 = vec3f(0.0, 0.0, 1.0);
            i2 = vec3f(1.0, 0.0, 1.0);
        }
    } else {
        if (d0.y < d0.z) {
            i1 = vec3f(0.0, 0.0, 1.0);
            i2 = vec3f(0.0, 1.0, 1.0);
        } else if (d0.x >= d0.z) {
            i1 = vec3f(0.0, 1.0, 0.0);
            i2 = vec3f(1.0, 1.0, 0.0);
        } else {
            i1 = vec3f(0.0, 1.0, 0.0);
            i2 = vec3f(0.0, 1.0, 1.0);
        }
    }

    let d1 = d0 - i1 + G3;
    let d2 = d0 - i2 + 2.0 * G3;
    let d3 = d0 - vec3f(1.0, 1.0, 1.0) + 3.0 * G3;

    let g0 = get_grad(ips, seed);
    let g1 = get_grad(ips + i1, seed);
    let g2 = get_grad(ips + i2, seed);
    let g3 = get_grad(ips + vec3f(1.0, 1.0, 1.0), seed);

    var n0 = 0.0;
    var n1 = 0.0;
    var n2 = 0.0;
    var n3 = 0.0;

    let t0 = 0.6 - dot(d0, d0);
    if (t0 > 0.0) {
        let t0_2 = t0 * t0;
        n0 = t0_2 * t0_2 * dot(g0, d0);
    }

    let t1 = 0.6 - dot(d1, d1);
    if (t1 > 0.0) {
        let t1_2 = t1 * t1;
        n1 = t1_2 * t1_2 * dot(g1, d1);
    }

    let t2 = 0.6 - dot(d2, d2);
    if (t2 > 0.0) {
        let t2_2 = t2 * t2;
        n2 = t2_2 * t2_2 * dot(g2, d2);
    }

    let t3 = 0.6 - dot(d3, d3);
    if (t3 > 0.0) {
        let t3_2 = t3 * t3;
        n3 = t3_2 * t3_2 * dot(g3, d3);
    }

    let val = 32.0 * (n0 + n1 + n2 + n3);
    return val * 0.5 + 0.5;
}

fn worley_noise(x: f32, y: f32, z: f32, seed: i32) -> f32 {
    let p = vec3f(x, y, z);
    let ip = floor(p);
    let fp = p - ip;

    var min_dist = 8.0;

    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            for (var k = -1; k <= 1; k++) {
                let cell_offset = vec3f(f32(i), f32(j), f32(k));
                let cell_coord = ip + cell_offset;
                let point_in_cell = get_cell_point(cell_coord, seed);
                let r = cell_offset + point_in_cell - fp;
                let d = dot(r, r);
                if (d < min_dist) {
                    min_dist = d;
                }
            }
        }
    }

    let val = sqrt(min_dist);
    return clamp(val, 0.0, 1.0);
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
        let n = simplex_noise(x * frequency, y * frequency, z * frequency, seed + i32(i) * 131i);

        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    return sum / max_val;
}

fn billow(x: f32, y: f32, z: f32, seed: i32, octaves: u32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var max_val = 0.0;

    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < octaves; i++) {
        let n = value_noise(x * frequency, y * frequency, z * frequency, seed + i32(i) * 131i);
        let v = abs(n * 2.0 - 1.0);
        sum += v * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    return sum / max_val;
}

fn ridged(x: f32, y: f32, z: f32, seed: i32, octaves: u32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var weight = 1.0;

    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < octaves; i++) {
        let n = value_noise(x * frequency, y * frequency, z * frequency, seed + i32(i) * 131i);
        var v = 1.0 - abs(n * 2.0 - 1.0);
        v = v * v;
        v = v * weight;
        weight = clamp(v * 2.0, 0.0, 1.0);

        sum += v * amplitude;
        frequency *= lacunarity;
        amplitude *= persistence;
    }

    var max_val = 0.0;
    var amp = 0.5;
    for (var i = 0u; i < octaves; i++) {
        max_val += amp;
        amp *= persistence;
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

    // return fbm(p.x, p.y, p.z, seed + 3, 4);
    // return billow(p.x, p.y, p.z, seed + 3, 4);
    return fbm(p.x, p.y, p.z, seed + 3, 4);
}
