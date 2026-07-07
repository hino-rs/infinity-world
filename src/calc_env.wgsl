const CHUNK_SIZE_U: u32 = 32;
const CHUNK_SIZE_I: i32 = i32(CHUNK_SIZE_U);
const CHUNK_SIZE_F: f32 = f32(CHUNK_SIZE_I);
// const SCALE: f32 = 512.0;
const SCALE: f32 = 1.0;
const MOUNTAIN_HEIGHT: f32 = 256.0;
const SEA_LEVEL: i32 = 10;
const DIRT_DEPTH: i32 = 4;

const MAX_TEMP: f32 = 60.0;
const MIN_TEMP: f32 = -90.0;

const MAX_HEIGHT: f32 = 10000.0;
const MIN_HEIGT: f32 = 0.0;
const OCTAVES: u32 = 2;

struct ChunkUniforms {
    chunk_pos: vec3i,
    seed: i32,
}

@group(0) @binding(0) var<storage, read> uniforms: array<ChunkUniforms>;
@group(0) @binding(2) var<storage, read_write> env_data: array<u32>;

fn calc_saturated_water(temp: f32) -> f32 {
    let t = clamp(temp, -50.0, 50.0);
    return max(4.85 * exp(0.06 * t), 0.001);
}

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

    // 海面の気温
    var sealevel_temperature = fbm(wx, 0.0, wz, seed + 5);
    // -90.0~150.0に拡大しつつ、平均は15.0になるようにする
    sealevel_temperature = -90.0 + 150.0 * pow(sealevel_temperature, 0.4286);
    // 水蒸気量
    var water = fbm(wx, 0.0, wz, seed - 5);
    // ~40.0に拡大しつつ、2.5と18.5に最頻値を傾けさせる
    if water < 0.5 {
        let t = water / 0.5;
        let t0 = 2.5 / 10.0;
        let denom = pow((1.0 - t0), 3) + pow(t0, 3);
        let g = (pow((t - t0), 3) + pow(t0, 3)) / denom;
        water = 10.0 * g;
    } else {
        let t = (water - 0.5) / 0.5;
        let t0 = (18.5 - 10.0) / 30.0;
        let denom = pow((1.0 - t0), 3) + pow(t0, 3);
        let g = (pow((t - t0), 3) + pow(t0, 3)) / denom;
        water = 10.0 * (30.0 * g);
    }

    let chunk_offset = chunk_idx * (CHUNK_SIZE_U * CHUNK_SIZE_U * CHUNK_SIZE_U);

    for (var y = 0u; y < CHUNK_SIZE_U; y++) {
        let wy = cy * CHUNK_SIZE_I + i32(y);
        let index = chunk_offset + y * (CHUNK_SIZE_U * CHUNK_SIZE_U) + x * CHUNK_SIZE_U + z;

        // 気温 = 海面(100)気温 - 0.65 * 海面からの高さ / 100.0
        let temperature = sealevel_temperature - 0.65 * f32(max(wy - SEA_LEVEL, 1)) / 100.0;
        // 湿度% = 水蒸気量 / (疑似)飽和水蒸気量
        let saturated_water = calc_saturated_water(temperature);
        let humidity = clamp((water / saturated_water) * 100.0, 0.0, 100.0);

        env_data[index] = pack2x16float(vec2f(temperature, humidity));
    }
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

fn fade(t: f32) -> f32 {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
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

fn fbm(x: f32, y: f32, z: f32, seed: i32) -> f32 {
    var sum = 0.0;
    var amplitude = 0.5;
    var frequency = 1.0;
    var max_val = 0.0;

    let lacunarity = 2.0;
    let persistence = 0.5;

    for (var i = 0u; i < OCTAVES; i++) {
        let n = perlin_noise(x * frequency, y * frequency, z * frequency, seed + i32(i) * 131i);

        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    return sum / max_val;
}