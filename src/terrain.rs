use crate::consts::*;
use crate::{game::BlockType, state::ChunkBlocks};
use crate::noise::*;


/// 地形の頂点データ
#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable)]
pub struct TerrainVertex {
    pub position: [f32; 3],
    pub tex_coords: [f32; 2],
    pub block_type: u32,
    pub ao_factor: f32,
}

impl TerrainVertex {
    pub fn desc() -> wgpu::VertexBufferLayout<'static> {
        use std::mem;
        wgpu::VertexBufferLayout {
            array_stride: mem::size_of::<TerrainVertex>() as wgpu::BufferAddress,
            step_mode: wgpu::VertexStepMode::Vertex,
            attributes: &[
                wgpu::VertexAttribute {
                    offset: 0,
                    shader_location: 0,
                    format: wgpu::VertexFormat::Float32x3,
                },
                wgpu::VertexAttribute {
                    offset: 12,
                    shader_location: 1,
                    format: wgpu::VertexFormat::Float32x2,
                },
                wgpu::VertexAttribute {
                    offset: 20,
                    shader_location: 2,
                    format: wgpu::VertexFormat::Uint32,
                },
                wgpu::VertexAttribute {
                    offset: 24,
                    shader_location: 3,
                    format: wgpu::VertexFormat::Float32,
                },
            ],
        }
    }
}


pub fn calc_ao(side1: bool, side2: bool, corner: bool) -> u8 {
    if side1 && side2 {
        return 0;
    }
    3 - (side1 as u8 + side2 as u8 + corner as u8)
}


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
    let mask = (get_fbm(wx / 500.0, 0.0, wz / 500.0, SEED + 2, 2) * 0.5 /*ここからの数値が高いほど山が多くなる*/ + 0.2 - 0.0).max(0.0);
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

    let index = (x as usize) * X_STRIDE + (y as usize) * CHUNK_SIZE + (z as usize);
    blocks[index] != BlockType::Air
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
                let index = x * X_STRIDE + y * CHUNK_SIZE + z;
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
                let index = x * X_STRIDE + y * CHUNK_SIZE + z;
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

                    let f0 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi + 1, zi, blocks), is_solid(xi, yi + 1, zi - 1, blocks), is_solid(xi - 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi + 1, zi, blocks), is_solid(xi, yi + 1, zi - 1, blocks), is_solid(xi + 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi + 1, zi, blocks), is_solid(xi, yi + 1, zi + 1, blocks), is_solid(xi + 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi + 1, zi, blocks), is_solid(xi, yi + 1, zi + 1, blocks), is_solid(xi - 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);

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

                    let f0 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi - 1, zi, blocks), is_solid(xi, yi - 1, zi - 1, blocks), is_solid(xi - 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi - 1, zi, blocks), is_solid(xi, yi - 1, zi - 1, blocks), is_solid(xi + 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi - 1, zi, blocks), is_solid(xi, yi - 1, zi + 1, blocks), is_solid(xi + 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi - 1, zi, blocks), is_solid(xi, yi - 1, zi + 1, blocks), is_solid(xi - 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);

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

                    let f0 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi, zi - 1, blocks), is_solid(xi, yi - 1, zi - 1, blocks), is_solid(xi - 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi, zi - 1, blocks), is_solid(xi, yi - 1, zi - 1, blocks), is_solid(xi + 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi, zi - 1, blocks), is_solid(xi, yi + 1, zi - 1, blocks), is_solid(xi + 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi, zi - 1, blocks), is_solid(xi, yi + 1, zi - 1, blocks), is_solid(xi - 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);

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

                    let f0 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi, zi + 1, blocks), is_solid(xi, yi - 1, zi + 1, blocks), is_solid(xi - 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi, zi + 1, blocks), is_solid(xi, yi - 1, zi + 1, blocks), is_solid(xi + 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi, zi + 1, blocks), is_solid(xi, yi + 1, zi + 1, blocks), is_solid(xi + 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi, zi + 1, blocks), is_solid(xi, yi + 1, zi + 1, blocks), is_solid(xi - 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);

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

                    let f0 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi - 1, zi, blocks), is_solid(xi - 1, yi, zi - 1, blocks), is_solid(xi - 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi + 1, zi, blocks), is_solid(xi - 1, yi, zi - 1, blocks), is_solid(xi - 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi + 1, zi, blocks), is_solid(xi - 1, yi, zi + 1, blocks), is_solid(xi - 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (calc_ao(is_solid(xi - 1, yi - 1, zi, blocks), is_solid(xi - 1, yi, zi + 1, blocks), is_solid(xi - 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);

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

                    let f0 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi - 1, zi, blocks), is_solid(xi + 1, yi, zi - 1, blocks), is_solid(xi + 1, yi - 1, zi - 1, blocks)) as f32 / 3.0);
                    let f1 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi - 1, zi, blocks), is_solid(xi + 1, yi, zi + 1, blocks), is_solid(xi + 1, yi - 1, zi + 1, blocks)) as f32 / 3.0);
                    let f2 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi + 1, zi, blocks), is_solid(xi + 1, yi, zi + 1, blocks), is_solid(xi + 1, yi + 1, zi + 1, blocks)) as f32 / 3.0);
                    let f3 = 0.25 + 0.75 * (calc_ao(is_solid(xi + 1, yi + 1, zi, blocks), is_solid(xi + 1, yi, zi - 1, blocks), is_solid(xi + 1, yi + 1, zi - 1, blocks)) as f32 / 3.0);

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
