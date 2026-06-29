use noise::NoiseFn;

const SEED: u32 = 531111891;
const SEA_LEVEL: f64 = 10.0; // 平均的な地表
const DIRT_DEPTH: i32 = 4;
const MAX_MOUNTAIN_HEIGHT: f64 = MAX_HEIGHT as f64;

use crate::{game::BlockType, state::{CHUNK_AREA, CHUNK_SIZE, ChunkBlocks, MAX_HEIGHT}};
use crate::game::TerrainVertex;

pub struct Chunk {
    pub coord: (i32, i32),
    pub blocks: ChunkBlocks,
    pub vertex_buffer: wgpu::Buffer,
    pub index_buffer: wgpu::Buffer,
    pub num_indices: u32,
}

// 1列分の地表の高さを2Dで決める
fn surface_height(wx: f64, wz: f64) -> i32 {
    // 平地の起伏
    let hills = get_fbm(wx / 80.0, 0.0, wz / 80.0, SEED, 4) * 6.0;

    // 山岳
    let n = get_fbm(wx / 220.0, 0.0, wz / 220.0, SEED + 1, 5);
    let ridge = (1.0 - n.abs()).powi(3);
    let mask = (get_fbm(wx / 500.0, 0.0, wz / 500.0, SEED + 2, 2) * 0.5 /*ここからの数値が高いほど山が多くなる*/ + 0.85 - 0.0).max(0.0);
    let mountains = ridge * mask * MAX_MOUNTAIN_HEIGHT;

    (SEA_LEVEL + hills + mountains).round() as i32
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

fn value_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    noise::Value::new(seed).get([x, y, z])
}

fn perlin_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    noise::Perlin::new(seed).get([x, y, z])
}

fn simplex_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    noise::OpenSimplex::new(seed).get([x, y, z])
}

fn ridged_multi_perlin_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    noise::RidgedMulti::<noise::Perlin>::new(seed).get([x, y, z])
}


fn get_fbm(x: f64, y: f64, z: f64, seed: u32, octaves: u32) -> f64 {
    let mut sum = 0.0;
    let mut amplitude = 0.5;
    let mut frequency = 1.0;
    let mut max_val = 0.0;

    // 空隙性
    let lacunarity = 2.0;
    // 持続度
    let persistence = 0.5;

    for i in 0..octaves {
        let n = simplex_noise(x * frequency, y * frequency, z * frequency, seed + i * 131);
        
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

    for x in 0..CHUNK_SIZE {
        for z in 0..CHUNK_SIZE {
            let wx = (chunk_x * CHUNK_SIZE as i32 + x as i32) as f64;
            let wz = (chunk_z * CHUNK_SIZE as i32 + z as i32) as f64;

            let h = surface_height(wx, wz).clamp(1, MAX_HEIGHT as i32 - 1);

            // 底から地表高さまで詰めるだけ（上はデフォルトの Air のまま）
            for y in 0..=h as usize {
                let yi = y as i32;
                let index = x * CHUNK_AREA + y * CHUNK_SIZE + z;
                blocks[index] = if yi == h {
                    if h > 60 { BlockType::Stone } else { BlockType::Grass } // 高所は岩肌
                } else if yi >= h - DIRT_DEPTH {
                    BlockType::Dirt
                } else {
                    BlockType::Stone
                };
            }
        }
    }
    blocks
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
