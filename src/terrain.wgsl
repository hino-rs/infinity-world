const CHUNK_SIZE_U: u32 = 32;
const CHUNK_SIZE_I: i32 = i32(CHUNK_SIZE_U);
const CHUNK_SIZE_F: f32 = f32(CHUNK_SIZE_I);
const SCALE: f32 = 2048.0;
const MOUNTAIN_HEIGHT: f32 = 256.0;
const SEA_LEVEL: i32 = 10;
const DIRT_DEPTH: i32 = 4;

struct ChunkUniforms {
    chunk_pos: vec3i,
    seed: u32,
}

const CLIMATE_SCALE: f32 = 4096.0;
fn get_climate(wx: f32, wz: f32, seed: u32) -> vec2f {
    let sc = vec2f(wx, wz) / CLIMATE_SCALE;
    let r = pink_noise(sc.x, sc.y, seed + 888u);
    let temp = mix(-30.0, 30.0, r) + 10.0;
    return vec2f(temp, r);
}

@group(0) @binding(0) var<storage, read> uniforms: array<ChunkUniforms>;
@group(0) @binding(1) var<storage, read_write> blocks: array<u32>;


fn calc_humidity(mois: f32, temp: f32) -> vec2f {
    // 相対温度
    let rh = mois * 100.0;
    
    // 飽和水蒸気圧
    var es = 0.0f;
    if temp >= 0.0 {
        es = 6.1078 * pow(10.0, (7.5 * temp) / (temp + 237.3));
    } else {
        es = 6.1078 * pow(10.0, (9.5 * temp) / (temp + 265.5));
    }

    // 現在の水蒸気圧
    let e = es * (rh / 100.0);

    // 絶対湿度
    let ah = 217.0 * e / (temp + 273.15);

    return vec2f(rh, ah);
}

struct Biome {
    temp: f32,
    mois: f32,
}

struct BiomeBlockType {
    Af: array<u32, 2>,
    Am: array<u32, 2>,
    Aw: array<u32, 4>,
    BW: array<u32, 4>,
    BS: array<u32, 3>,
    Cfa: array<u32, 2>,
    Cfb: array<u32, 1>,
    Cs: array<u32, 2>,
    Cw: array<u32, 2>,
    Df: array<u32, 2>,
    Dw: array<u32, 2>,
    Ds: array<u32, 2>,
    ET: array<u32, 2>,
    EF: array<u32, 1>,
}

const BIOME_BLOCK_TYPES = BiomeBlockType(
    // Af: ラトソル, 赤黄色土
    array<u32, 2>(67u, 68u),
    // Am: ラトソル, 赤黄色土
    array<u32, 2>(67u, 68u),
    // Aw: ラトソル, 赤黄色土, レグール土, テラローシャ
    array<u32, 4>(67u, 68u, 69u, 70u),

    // BW: 砂漠土・砂・礫・岩石
    array<u32, 4>(65u, 4u, 120u, 1u),
    // BS: チェルノーゼム, プレーリー土, 栗色土
    array<u32, 3>(71u, 72u, 73u),

    // Cfa: 褐色森林土, 赤黄色土
    array<u32, 2>(74u, 68u),
    // Cfb: 褐色森林土
    array<u32, 1>(74u),
    // Cs: テラロッサ, 褐色森林土
    array<u32, 2>(75u, 74u),
    // Cw: 赤黄色土, 褐色森林土
    array<u32, 2>(68u, 74u),

    // Df: ポトゾル・永久凍土(地下)
    array<u32, 2>(61u, 66u),
    // Dw: ポトゾル・永久凍土(地下)
    array<u32, 2>(61u, 66u),
    // Ds: ポトゾル, 高山土壌(高いところ)
    array<u32, 2>(61u, 76u),

    // ET: ツンドラ土, 永久凍土(地下)
    array<u32, 2>(77u, 66u),
    // EF: 氷
    array<u32, 1>(101u),
);

const BIOME_COUNT = 14u;
const BIOMES = array<Biome, 14>(
    Biome(27.0, 0.95),  // Af (熱帯雨林)
    Biome(26.5, 0.89),  // Am (熱帯モンスーン)
    Biome(26.0, 0.70),  // Aw (サバナ)
    Biome(22.5, 0.20),  // BW (砂漠)
    Biome(18.5, 0.30),  // BS (ステップ)
    Biome(16.5, 0.48),  // Cfa (温暖湿潤)
    Biome(11.0, 0.36),  // Cfb (西岸海洋性)
    Biome(16.0, 0.39),  // Cs (地中海性)
    Biome(19.0, 0.52),  // Cw (温暖冬季少雨)
    Biome(3.5, 0.23),   // Df (亜寒帯湿潤)
    Biome(-1.5, 0.16),  // Dw (亜寒帯冬季少雨)
    Biome(5.0, 0.20),   // Ds (高山)
    Biome(-4.0, 0.10),  // ET (ツンドラ)
    Biome(-22.5, 0.02), // EF (氷雪)
);

fn get_biome_id(t: f32, h: f32) -> u32 {
    var min_distance = 9999.0;
    var closest_idx = 0u;

    for (var i = 0u; i < BIOME_COUNT; i = i + 1u) {
        var b = BIOMES[i];
        let dt = b.temp - t;
        let dh = b.mois - h;
        let distance = dt*dt + dh*dh;

        if (distance < min_distance) {
            min_distance = distance;
            closest_idx = i;
        }
    }
    return closest_idx;
}

fn get_biome_block(biome_idx: u32, depth: i32, wx: f32, wz: f32, seed: u32) -> u32 {
    if (depth >= DIRT_DEPTH) {
        return 1u; // Stone
    }

    let n = hash2d(vec2f(wx, wz), seed);

    switch (biome_idx) {
        case 0u: { // Af
            if (depth == 0) { return BIOME_BLOCK_TYPES.Af[0]; }
            else { return BIOME_BLOCK_TYPES.Af[1]; }
        }
        case 1u: { // Am
            if (depth == 0) { return BIOME_BLOCK_TYPES.Am[0]; }
            else { return BIOME_BLOCK_TYPES.Am[1]; }
        }
        case 2u: { // Aw
            if (depth == 0) {
                if (n < 0.5) { return BIOME_BLOCK_TYPES.Aw[0]; }
                else { return BIOME_BLOCK_TYPES.Aw[2]; }
            } else {
                if (n < 0.5) { return BIOME_BLOCK_TYPES.Aw[1]; }
                else { return BIOME_BLOCK_TYPES.Aw[3]; }
            }
        }
        case 3u: { // BW
            if (depth == 0) {
                if (n < 0.7) { return BIOME_BLOCK_TYPES.BW[1]; }
                else { return BIOME_BLOCK_TYPES.BW[0]; }
            } else {
                if (n < 0.6) { return BIOME_BLOCK_TYPES.BW[2]; }
                else { return BIOME_BLOCK_TYPES.BW[3]; }
            }
        }
        case 4u: { // BS
            if (depth == 0) {
                if (n < 0.5) { return BIOME_BLOCK_TYPES.BS[0]; }
                else { return BIOME_BLOCK_TYPES.BS[1]; }
            } else {
                return BIOME_BLOCK_TYPES.BS[2];
            }
        }
        case 5u: { // Cfa
            if (depth == 0) { return BIOME_BLOCK_TYPES.Cfa[0]; }
            else { return BIOME_BLOCK_TYPES.Cfa[1]; }
        }
        case 6u: { // Cfb
            return BIOME_BLOCK_TYPES.Cfb[0];
        }
        case 7u: { // Cs
            if (depth == 0) { return BIOME_BLOCK_TYPES.Cs[0]; }
            else { return BIOME_BLOCK_TYPES.Cs[1]; }
        }
        case 8u: { // Cw
            if (depth == 0) { return BIOME_BLOCK_TYPES.Cw[0]; }
            else { return BIOME_BLOCK_TYPES.Cw[1]; }
        }
        case 9u: { // Df
            if (depth < 2) { return BIOME_BLOCK_TYPES.Df[0]; }
            else { return BIOME_BLOCK_TYPES.Df[1]; }
        }
        case 10u: { // Dw
            if (depth < 2) { return BIOME_BLOCK_TYPES.Dw[0]; }
            else { return BIOME_BLOCK_TYPES.Dw[1]; }
        }
        case 11u: { // Ds
            if (depth == 0) { return BIOME_BLOCK_TYPES.Ds[1]; }
            else { return BIOME_BLOCK_TYPES.Ds[0]; }
        }
        case 12u: { // ET
            if (depth < 2) { return BIOME_BLOCK_TYPES.ET[0]; }
            else { return BIOME_BLOCK_TYPES.ET[1]; }
        }
        case 13u: { // EF
            return BIOME_BLOCK_TYPES.EF[0];
        }
        default: {
            return 1u; // Stone
        }
    }
}

fn get_wind(wx: f32, wz: f32, seed: u32) -> vec2f {
    let sx = wx / CLIMATE_SCALE;
    let sz = wz / CLIMATE_SCALE;
    let r = simplex_noise(sx, sz, seed + 7u);
    let dir = r * 6.28318530718;
    let vol = simplex_noise(sx, sz, seed + 7u) * 5.0;
    return vec2f(dir, vol);
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

    let chunk_offset = chunk_idx * (CHUNK_SIZE_U * CHUNK_SIZE_U * CHUNK_SIZE_U);
    
    // 気温, 湿潤度
    let env = get_climate(wx, wz, seed);
    let biome_idx = get_biome_id(env.x, env.y);
    let wind = get_wind(wx, wz, seed);

    var map: Map;
    map.temperature = env.x;
    map.moisture = env.y;
    map.wind_dir = wind.x;
    map.wind_speed = wind.y;

    let h = get_height(wx, wz, seed, map);
    
    // たまに木を生やす
    let tree_r = hash2d(vec2f(wx, wz), seed + 39u);

    for (var y = 0u; y < CHUNK_SIZE_U; y++) {
        let wy = uniforms[chunk_idx].chunk_pos.y * CHUNK_SIZE_I + i32(y);
        let index = chunk_offset + y * (CHUNK_SIZE_U * CHUNK_SIZE_U) + x * CHUNK_SIZE_U + z;

        if (wy <= h) {
            let depth = h - wy;
            blocks[index] = get_biome_block(biome_idx, depth, wx, wz, seed);
        } else if wy < SEA_LEVEL {
            blocks[index] = 100u;
        } else {
            if (tree_r > 0.999) && (wy < h + 5) {
                blocks[index] = 190u;
            } else {
                blocks[index] = 0u;
            }
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
fn hash(n: f32, seed: u32) -> f32 {
    return fract(sin(n) * 43758.5453123);
}

fn hash2d(p: vec2f, seed: u32) -> f32 {
    let ip = vec2u(
        u32(i32(floor(p.x))),
        u32(i32(floor(p.y)))
    );
    let s = seed;

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

fn hash3d(p: vec3f, seed: u32) -> f32 {
    let ip = vec3u(
        u32(i32(floor(p.x))),
        u32(i32(floor(p.y))),
        u32(i32(floor(p.z)))
    );
    let s = seed;

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
// 2D ノイズ関数群
// =======================================================

fn get_grad(p: vec2f, seed: u32) -> vec2f {
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

fn perlin_noise(x: f32, z: f32, seed: u32) -> f32 {
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

fn simplex_noise(x: f32, z: f32, seed: u32) -> f32 {
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

fn value_noise(x: f32, z: f32, seed: u32) -> f32 {
    let x_grid = floor(x);
    let z_grid = floor(z);

    let x_frac = x - x_grid;
    let z_frac = z - z_grid;

    let u = fade(x_frac);
    let w = fade(z_frac);

    let v00 = hash2d(vec2f(x_grid,       z_grid),       seed);
    let v10 = hash2d(vec2f(x_grid + 1.0, z_grid),       seed);
    let v01 = hash2d(vec2f(x_grid,       z_grid + 1.0), seed);
    let v11 = hash2d(vec2f(x_grid + 1.0, z_grid + 1.0), seed);

    let x0 = mix(v00, v10, u);
    let x1 = mix(v01, v11, u);

    return mix(x0, x1, w);
}

fn fbm(x: f32, z: f32, seed: u32, octaves: u32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var max_val = 0.0;

    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < octaves; i++) {
        let n = simplex_noise(x * frequency, z * frequency, seed + i * 131u);

        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    return sum / max_val;
}

fn billow(x: f32, z: f32, seed: u32, octaves: u32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var max_val = 0.0;

    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < octaves; i++) {
        let n = value_noise(x * frequency, z * frequency, seed + i * 131u);
        let v = abs(n * 2.0 - 1.0);
        sum += v * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    return sum / max_val;
}

fn ridged(x: f32, z: f32, seed: u32, octaves: u32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var weight = 1.0;

    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < octaves; i++) {
        let n = value_noise(x * frequency, z * frequency, seed + i * 131u);
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

fn get_cell_point(cell: vec2f, seed: u32) -> vec2f {
    let x_hash = hash2d(cell, seed);
    let y_hash = hash2d(cell, seed + 1357u);
    return vec2f(x_hash, y_hash);
}

fn worley_noise(x: f32, z: f32, seed: u32) -> f32 {
    let p = vec2f(x, z);
    let ip = floor(p);
    let fp = p - ip;

    var min_dist = 8.0;

    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            let cell_offset = vec2f(f32(i), f32(j));
            let cell_coord = ip + cell_offset;
            let point_in_cell = get_cell_point(cell_coord, seed);
            let r = cell_offset + point_in_cell - fp;
            let d = dot(r, r);
            if (d < min_dist) {
                min_dist = d;
            }
        }
    }

    let val = sqrt(min_dist);
    return clamp(val, 0.0, 1.0);
}

fn scaling(x: f32, z: f32) -> vec2f {
    let sx = x / SCALE;
    let sz = z / SCALE;
    return vec2f(sx, sz);
}

fn dw_fbm_value(sc: vec2f, amplitude: f32, seed: u32) -> f32 {
    let dx = value_noise(sc.x, sc.y, seed) * amplitude;
    let dy = value_noise(sc.x, sc.y, seed + 1u) * amplitude;

    let p = vec2f(sc.x + dx, sc.y + dy);

    return fbm(p.x, p.y, seed + 3u, 4);
}

fn pink_noise(x: f32, z: f32, seed: u32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var max_val = 0.0;
    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < 6u; i = i + 1u) {
        let n = simplex_noise(x * frequency, z * frequency, seed + i * 131u);
        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }
    return sum / max_val;
}

fn blue_noise(x: f32, z: f32, seed: u32) -> f32 {
    let p = vec2f(x, z);
    let white = hash2d(p, seed);
    let low = value_noise(x, z, seed);
    return clamp(white - low + 0.5, 0.0, 1.0);
}

// =======================================================
// 3D ノイズ関数群 (互換用)
// =======================================================

fn value_noise_3d(x: f32, y: f32, z: f32, seed: u32) -> f32 {
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

fn get_grad_3d(p: vec3f, seed: u32) -> vec3f {
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

fn get_cell_point_3d(cell: vec3f, seed: u32) -> vec3f {
    let x_hash = hash3d(cell, seed);
    let y_hash = hash3d(cell, seed + 1357u);
    let z_hash = hash3d(cell, seed + 2468u);
    return vec3f(x_hash, y_hash, z_hash);
}

fn perlin_noise_3d(x: f32, y: f32, z: f32, seed: u32) -> f32 {
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

    let n000 = dot(get_grad_3d(g000, seed), fp - vec3f(0.0, 0.0, 0.0));
    let n100 = dot(get_grad_3d(g100, seed), fp - vec3f(1.0, 0.0, 0.0));
    let n010 = dot(get_grad_3d(g010, seed), fp - vec3f(0.0, 1.0, 0.0));
    let n110 = dot(get_grad_3d(g110, seed), fp - vec3f(1.0, 1.0, 0.0));
    let n001 = dot(get_grad_3d(g001, seed), fp - vec3f(0.0, 0.0, 1.0));
    let n101 = dot(get_grad_3d(g101, seed), fp - vec3f(1.0, 0.0, 1.0));
    let n011 = dot(get_grad_3d(g011, seed), fp - vec3f(0.0, 1.0, 1.0));
    let n111 = dot(get_grad_3d(g111, seed), fp - vec3f(1.0, 1.0, 1.0));

    let x00 = mix(n000, n100, u);
    let x10 = mix(n010, n110, u);
    let x01 = mix(n001, n101, u);
    let x11 = mix(n011, n111, u);

    let y0 = mix(x00, x10, v);
    let y1 = mix(x01, x11, v);

    let val = mix(y0, y1, w);
    return val * 0.5 + 0.5;
}

fn simplex_noise_3d(x: f32, y: f32, z: f32, seed: u32) -> f32 {
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

    let g0 = get_grad_3d(ips, seed);
    let g1 = get_grad_3d(ips + i1, seed);
    let g2 = get_grad_3d(ips + i2, seed);
    let g3 = get_grad_3d(ips + vec3f(1.0, 1.0, 1.0), seed);

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

fn worley_noise_3d(x: f32, y: f32, z: f32, seed: u32) -> f32 {
    let p = vec3f(x, y, z);
    let ip = floor(p);
    let fp = p - ip;

    var min_dist = 8.0;

    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            for (var k = -1; k <= 1; k++) {
                let cell_offset = vec3f(f32(i), f32(j), f32(k));
                let cell_coord = ip + cell_offset;
                let point_in_cell = get_cell_point_3d(cell_coord, seed);
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
fn fbm_3d(x: f32, y: f32, z: f32, seed: u32, octaves: u32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var max_val = 0.0;

    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < octaves; i++) {
        let n = simplex_noise_3d(x * frequency, y * frequency, z * frequency, seed + i * 131u);

        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    return sum / max_val;
}

fn billow_3d(x: f32, y: f32, z: f32, seed: u32, octaves: u32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var max_val = 0.0;

    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < octaves; i++) {
        let n = value_noise_3d(x * frequency, y * frequency, z * frequency, seed + i * 131u);
        let v = abs(n * 2.0 - 1.0);
        sum += v * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    return sum / max_val;
}

fn ridged_3d(x: f32, y: f32, z: f32, seed: u32, octaves: u32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var weight = 1.0;

    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < octaves; i++) {
        let n = value_noise_3d(x * frequency, y * frequency, z * frequency, seed + i * 131u);
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

fn scaling_3d(x: f32, y: f32, z: f32) -> vec3f {
    let sx = x / SCALE;
    let sy = y / SCALE;
    let sz = z / SCALE;

    return vec3f(sx, sy, sz);
}

fn dw_fbm_value_3d(sc: vec3f, amplitude: f32, seed: u32) -> f32 {
    let dx = value_noise_3d(sc.x, sc.y, sc.z, seed) * amplitude;
    let dy = value_noise_3d(sc.x, sc.y, sc.z, seed + 1u) * amplitude;
    let dz = value_noise_3d(sc.x, sc.y, sc.z, seed + 2u) * amplitude;

    let p = vec3f(sc.x + dx, sc.y + dy, sc.z + dz);

    return fbm_3d(p.x, p.y, p.z, seed + 3u, 4);
}

fn pink_noise_3d(x: f32, y: f32, z: f32, seed: u32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var max_val = 0.0;
    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < 6u; i = i + 1u) {
        let n = simplex_noise_3d(x * frequency, y * frequency, z * frequency, seed + i * 131u);
        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }
    return sum / max_val;
}

fn blue_noise_3d(x: f32, y: f32, z: f32, seed: u32) -> f32 {
    let p = vec3f(x, y, z);
    let white = hash3d(p, seed);
    let low = value_noise_3d(x, y, z, seed);
    return clamp(white - low + 0.5, 0.0, 1.0);
}

fn bias(h: f32) -> f32 {
    let b = 0.2;
    return h / ((1.0/b-2.0)*(1.0-h)+1.0);
}

struct Map {
    temperature: f32,
    moisture: f32,
    wind_dir: f32,
    wind_speed: f32,
    continentalness: f32, // 大陸性
    erosion: f32, // 浸食度
}


fn custom_fbm(sx: f32, sz: f32, seed: u32, octaves: u32, lacunarity: f32, persistence: f32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var max_val = 0.0;

    for (var i = 0u; i < octaves; i++) {
        let n = worley_noise(sx * frequency, sz * frequency, seed + i * 131u);

        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    return sum / max_val;
}


fn custom_ridged(sx: f32, sz: f32, seed: u32, octaves: u32, lacunarity: f32, persistence: f32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var weight = 1.0;

    for (var i = 0u; i < octaves; i++) {
        let n = worley_noise(sx * frequency, sz * frequency, seed + i * 131u);
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


fn get_height(x: f32, z: f32, seed: u32, map: Map) -> i32 {    
    let scale = 2048.0;
    let sx = x / scale;
    let sz = z / scale;

    // let wind_vec = vec2f(cos(map.wind_dir), sin(map.wind_dir));
    // let wind_amp = clamp(map.wind_speed * 0.5, 0.0, 5.5);

    // let dx1 = simplex_noise(sx, sz, seed) - 0.5;
    // let dz1 = simplex_noise(sx, sz, seed + 1) - 0.5;
    // let dx2 = simplex_noise(dx1, dz1, seed + 2) + 0.5;
    // let dz2 = simplex_noise(dx2, sz, seed + 3) + 0.5;

    // let warped = vec2f(sx, sz) + wind_vec * wind_amp * vec2f((dx1 + dx2) / 2.0, (dz1 + dz2) / 2.0);

    // let fbm_h = fbm(warped.x, warped.y, seed + 3, 16u);
    // let ridged_h = ridged(warped.x, warped.y, seed + 4, 16u);

    // var h = pow(mix(ridged_h, fbm_h, clamp(map.moisture, 0.0, 1.0)), 3.0) * MOUNTAIN_HEIGHT;
    // h = mix(h, billow(warped.x, warped.y, seed + 5, 16u), 0.5);

    // let h = pow(custom_fbm(
    //     sx, 
    //     sz, 
    //     seed,
    //     4u,
    //     5.0,
    //     0.5,
    // ), 1.5);

    let h = blue_noise(
        sx,
        sz,
        seed,
    );

        // オクターブ数 
        // 空隙性 低いほど滑らか
        // 持続性 

    // return i32(round(h));
    return i32(h * MOUNTAIN_HEIGHT);
}
