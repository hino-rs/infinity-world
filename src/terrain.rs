use noise::NoiseFn;

const SEED: u32 = 142341311;

use crate::{game::BlockType, state::{CHUNK_AREA, CHUNK_SIZE, ChunkBlocks, MAX_HEIGHT}};
use crate::game::TerrainVertex;

pub struct Chunk {
    pub coord: (i32, i32),
    pub blocks: ChunkBlocks,
    pub vertex_buffer: wgpu::Buffer,
    pub index_buffer: wgpu::Buffer,
    pub num_indices: u32,
}

// 周辺ブロックが不透明ブロックかどうかを調べる
// チャンク外は空気(非ソリッド)とみなす
fn is_solid(x: i32, y: i32, z: i32, blocks: &ChunkBlocks) -> bool {
    if x < 0 || x >= CHUNK_SIZE as i32 ||
       y < 0 || y >= MAX_HEIGHT as i32 ||
       z < 0 || z >= CHUNK_SIZE as i32 {
        return false;    
    }

    let index = (x as usize) * CHUNK_AREA + (y as usize) * CHUNK_SIZE + (z as usize);
    blocks[index] != BlockType::Air
}

pub fn build_chunk_mesh(
    blocks: &ChunkBlocks,
    chunk_x: i32,
    chunk_z: i32,
) -> (Vec<TerrainVertex>, Vec<u32>) 
{
    let mut vertices = Vec::new();
    let mut indices = Vec::new();

    // チャンクの左下隅のワールド座標
    let offset_x = (chunk_x * CHUNK_SIZE as i32) as f32;
    let offset_z = (chunk_z * CHUNK_SIZE as i32) as f32;

    for x in 0..CHUNK_SIZE {
        for y in 0..MAX_HEIGHT {
            for z in 0..CHUNK_SIZE {
                let index = x * CHUNK_AREA + y * CHUNK_SIZE + z;
                let block = blocks[index];

                if block == BlockType::Air {
                    continue;
                }

                let block_type_id = block as u32;
                let bx = x as f32 + offset_x;
                let by = y as f32;
                let bz = z as f32 + offset_z;
                let xi = x as i32;
                let yi = y as i32;
                let zi = z as i32;

                // 上面 (+Y)
                if !is_solid(xi, yi + 1, zi, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi + 1, zi, blocks), is_solid(xi, yi + 1, zi - 1, blocks), is_solid(xi - 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi + 1, zi, blocks), is_solid(xi, yi + 1, zi - 1, blocks), is_solid(xi + 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi + 1, zi, blocks), is_solid(xi, yi + 1, zi + 1, blocks), is_solid(xi + 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi + 1, zi, blocks), is_solid(xi, yi + 1, zi + 1, blocks), is_solid(xi - 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);

                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + 0.5, bz - 0.5],
                        tex_coords: [0.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f0,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by + 0.5, bz - 0.5],
                        tex_coords: [1.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f1,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by + 0.5, bz + 0.5],
                        tex_coords: [1.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f2,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + 0.5, bz + 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f3,
                    });

                    indices.extend_from_slice(&[
                        start_idx + 0, start_idx + 3, start_idx + 2,
                        start_idx + 0, start_idx + 2, start_idx + 1,
                    ]);
                }

                // 下面 (-Y)
                if !is_solid(xi, yi - 1, zi, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi - 1, zi, blocks), is_solid(xi, yi - 1, zi - 1, blocks), is_solid(xi - 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi - 1, zi, blocks), is_solid(xi, yi - 1, zi - 1, blocks), is_solid(xi + 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi - 1, zi, blocks), is_solid(xi, yi - 1, zi + 1, blocks), is_solid(xi + 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi - 1, zi, blocks), is_solid(xi, yi - 1, zi + 1, blocks), is_solid(xi - 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);

                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f0,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [1.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f1,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by - 0.5, bz + 0.5],
                        tex_coords: [1.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f2,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz + 0.5],
                        tex_coords: [0.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f3,
                    });

                    indices.extend_from_slice(&[
                        start_idx + 0, start_idx + 1, start_idx + 2,
                        start_idx + 0, start_idx + 2, start_idx + 3,    
                    ]);
                }

                // 後ろ面 (-Z)
                if !is_solid(xi, yi, zi - 1, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi, zi - 1, blocks), is_solid(xi, yi - 1, zi - 1, blocks), is_solid(xi - 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi, zi - 1, blocks), is_solid(xi, yi - 1, zi - 1, blocks), is_solid(xi + 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi, zi - 1, blocks), is_solid(xi, yi + 1, zi - 1, blocks), is_solid(xi + 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi, zi - 1, blocks), is_solid(xi, yi + 1, zi - 1, blocks), is_solid(xi - 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);

                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [0.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f0,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [1.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f1,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by + 0.5, bz - 0.5],
                        tex_coords: [1.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f2,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + 0.5, bz - 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f3,
                    });

                    indices.extend_from_slice(&[
                        start_idx + 0, start_idx + 3, start_idx + 2,
                        start_idx + 0, start_idx + 2, start_idx + 1,
                    ]);
                }

                // 前面 (+Z)
                if !is_solid(xi, yi, zi + 1, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi, zi + 1, blocks), is_solid(xi, yi - 1, zi + 1, blocks), is_solid(xi - 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi, zi + 1, blocks), is_solid(xi, yi - 1, zi + 1, blocks), is_solid(xi + 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi, zi + 1, blocks), is_solid(xi, yi + 1, zi + 1, blocks), is_solid(xi + 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi, zi + 1, blocks), is_solid(xi, yi + 1, zi + 1, blocks), is_solid(xi - 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);

                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz + 0.5],
                        tex_coords: [0.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f0,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by - 0.5, bz + 0.5],
                        tex_coords: [1.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f1,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by + 0.5, bz + 0.5],
                        tex_coords: [1.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f2,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + 0.5, bz + 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f3,
                    });

                    indices.extend_from_slice(&[
                        start_idx + 0, start_idx + 1, start_idx + 2,
                        start_idx + 0, start_idx + 2, start_idx + 3,
                    ]);
                }

                // 左面 (-X)
                if !is_solid(xi - 1, yi, zi, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi - 1, zi, blocks), is_solid(xi - 1, yi, zi - 1, blocks), is_solid(xi - 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi + 1, zi, blocks), is_solid(xi - 1, yi, zi - 1, blocks), is_solid(xi - 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi + 1, zi, blocks), is_solid(xi - 1, yi, zi + 1, blocks), is_solid(xi - 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi - 1, yi - 1, zi, blocks), is_solid(xi - 1, yi, zi + 1, blocks), is_solid(xi - 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);

                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [0.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f0,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + 0.5, bz - 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f1,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + 0.5, bz + 0.5],
                        tex_coords: [1.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f2,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz + 0.5],
                        tex_coords: [1.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f3,
                    });

                    indices.extend_from_slice(&[
                        start_idx + 0, start_idx + 3, start_idx + 2,
                        start_idx + 0, start_idx + 2, start_idx + 1,
                    ]);
                }

                // 右面 (+X)
                if !is_solid(xi + 1, yi, zi, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi - 1, zi, blocks), is_solid(xi + 1, yi, zi - 1, blocks), is_solid(xi + 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi - 1, zi, blocks), is_solid(xi + 1, yi, zi + 1, blocks), is_solid(xi + 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi + 1, zi, blocks), is_solid(xi + 1, yi, zi + 1, blocks), is_solid(xi + 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (crate::game::calc_ao(is_solid(xi + 1, yi + 1, zi, blocks), is_solid(xi + 1, yi, zi - 1, blocks), is_solid(xi + 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);

                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [1.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f0,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by - 0.5, bz + 0.5],
                        tex_coords: [0.0, 1.0],
                        block_type: block_type_id,
                        ao_factor: f1,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by + 0.5, bz + 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f2,
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by + 0.5, bz - 0.5],
                        tex_coords: [1.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: f3,
                    });

                    indices.extend_from_slice(&[
                        start_idx + 0, start_idx + 3, start_idx + 2,
                        start_idx + 0, start_idx + 2, start_idx + 1,
                    ]);
                }
            }
        }
    }

    (vertices, indices)
}

fn value_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    noise::Value::new(seed).get([x, y, z])
}

fn get_fbm(x: f64, y: f64, z: f64, seed: u32, octaves: u32) -> f64 {
    let mut sum = 0.0;
    let mut amplitude = 0.5;
    let mut frequency = 1.0;
    let mut max_val = 0.0;

    // 空隙性
    let lacunarity = 2.0;
    // 持続度
    let persistence = 0.1;

    for i in 0..octaves {
        let n = value_noise(x * frequency, y * frequency, z * frequency, seed + i * 131);
        
        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    sum / max_val
}

pub fn lerp(a: f64, b: f64, t: f64) -> f64 {
    a + (b - a) * t
}

pub fn create_terrain(chunk_x: i32, chunk_z: i32) -> ChunkBlocks {
    let mut blocks = [BlockType::Air; CHUNK_SIZE * MAX_HEIGHT * CHUNK_SIZE];
    let scale = 8.0;

    for x in 0..CHUNK_SIZE {
        for y in 0..MAX_HEIGHT {
            for z in 0..CHUNK_SIZE {
                let index = x * CHUNK_AREA + y * CHUNK_SIZE + z;
                if y == 0 {
                    blocks[index] = BlockType::Stone;
                    continue;
                }

                // ローカル座標からワールド座標
                let wx = (chunk_x * CHUNK_SIZE as i32 + x as i32) as f64;
                let wz = (chunk_z * CHUNK_SIZE as i32 + z as i32) as f64;

                // 高いほどバイアスを大きく
                let height_bias = y as f64 / MAX_HEIGHT as f64;
                // 座標をscaleで割りバイアスで引く
                let r = get_fbm(wx / scale, y as f64 / scale, wz / scale, SEED, 4) + height_bias;

                let block = if r < -0.2 {
                    BlockType::Stone
                } else if r < 0.0 {
                    BlockType::Dirt
                } else if r < 0.1 {
                    BlockType::Grass
                } else {
                    BlockType::Air
                };
                blocks[index] = block;
            }
        }
    }

    blocks
}
