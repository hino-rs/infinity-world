const CHUNK_SIZE_U: u32 = 32;
const CHUNK_SIZE_I: i32 = i32(CHUNK_SIZE_U);
const CHUNK_SIZE_F: f32 = f32(CHUNK_SIZE_I);
const SCALE: f32 = 512.0;
const MOUNTAIN_HEIGHT: f32 = 256.0;
const SEA_LEVEL: i32 = 10;
const DIRT_DEPTH: i32 = 4;

struct ChunkUniforms {
    chunk_pos: vec3i,
    seed: i32,
}

@group(0) @binding(0) var<uniform> uniforms: ChunkUniforms;
@group(0) @binding(2) var<storage, read_write> env_data: array<u32>;

    // let original = vec2<f32>(0.5, -0.8);
    // let packed = pack2x16snorm(my_vector);
    // let unpacked = unpack2x16snorm(packed);

@compute
@workgroup_size(8, 8, 1)
fn main(@builtin(global_invocation_id) global_id: vec3u) {

}