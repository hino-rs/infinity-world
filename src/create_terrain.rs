use crate::consts::*;
use crate::game::BlockType::{Air, Water};
use crate::noise::*;
use crate::utils::IndexVec;
use crate::{game::BlockType, terrain::*};

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

// 1列分の地表の高さを2Dで決める
pub fn _surface_height(wx: f64, wz: f64, seed: u32) -> i32 {
    // 平地の起伏
    let hills = get_fbm(wx / 80.0, 0.0, wz / 80.0, seed, 4) * 6.0;

    // 山岳
    let n = get_fbm(wx / 220.0, 0.0, wz / 220.0, seed + 1, 5);
    let ridge = (1.0 - n.abs()).powi(3);
    let mask = (get_fbm(wx / 500.0, 0.0, wz / 500.0, seed + 2, 2) * 0.5 /*ここからの数値が高いほど山が多くなる*/ + 0.2 - 0.0).max(0.0);
    let mountains = ridge * mask * 100000.0;

    (SEA_LEVEL as f64 + hills + mountains).round() as i32
}

// 周辺ブロックが不透明ブロックかどうかを調べる
// チャンク外は空気(非ソリッド)とみなす
pub fn is_solid(x: i32, y: i32, z: i32, blocks: &ChunkBlocks) -> bool {
    if x < 0
        || x >= CHUNK_SIZE as i32
        || y < 0
        || y >= CHUNK_SIZE as i32
        || z < 0
        || z >= CHUNK_SIZE as i32
    {
        return false;
    }

    let index = Chunk::index(x, y, z);
    blocks[index] != BlockType::Air
}

pub fn build_chunk_mesh(
    blocks: &ChunkBlocks,
    chunk_x: i32,
    chunk_y: i32,
    chunk_z: i32,
) -> (Vec<TerrainVertex>, Vec<u32>) {
    let mut vertices = Vec::new();
    let mut indices = Vec::new();

    // チャンクの左下隅のワールド座標
    let offset_x = (chunk_x * CHUNK_SIZE as i32) as f32;
    let offset_y = (chunk_y * CHUNK_SIZE as i32) as f32;
    let offset_z = (chunk_z * CHUNK_SIZE as i32) as f32;

    for x in 0..CHUNK_SIZE {
        for y in 0..CHUNK_SIZE {
            for z in 0..CHUNK_SIZE {
                let center = IndexVec::<CHUNK_SIZE, CHUNK_SIZE>::new(x, y, z);
                let index = center.to_index();
                let block = blocks[index];

                if block == BlockType::Air {
                    continue;
                }

                if !(x == 0
                    || x == CHUNK_SIZE
                    || y == 0
                    || y == CHUNK_SIZE
                    || z == 0
                    || z == CHUNK_SIZE)
                {
                    if index > CHUNK_SIZE && index < NUM_CHUNK_BLOCKS - Y_STRIDE {
                        let up = blocks[center.up()];
                        let down = blocks[center.down()];
                        let left = blocks[center.left()];
                        let right = blocks[center.right()];
                        let front = blocks[center.front()];
                        let back = blocks[center.back()];

                        if up != Air
                            && up != Water
                            && down != Air
                            && down != Water
                            && left != Air
                            && left != Water
                            && right != Air
                            && right != Water
                            && front != Air
                            && front != Water
                            && back != Air
                            && back != Water
                        {
                            continue;
                        }
                    }
                }

                let block_type_id = block as u32;
                let bx = x as f32 + offset_x;
                let by = y as f32 + offset_y;
                let bz = z as f32 + offset_z;
                let xi = x as i32;
                let yi = y as i32;
                let zi = z as i32;

                // 上面 (+Y)
                if !is_solid(xi, yi + 1, zi, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi + 1, zi, blocks),
                                is_solid(xi, yi + 1, zi - 1, blocks),
                                is_solid(xi - 1, yi + 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);
                    let f1 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi + 1, zi, blocks),
                                is_solid(xi, yi + 1, zi - 1, blocks),
                                is_solid(xi + 1, yi + 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);
                    let f2 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi + 1, zi, blocks),
                                is_solid(xi, yi + 1, zi + 1, blocks),
                                is_solid(xi + 1, yi + 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);
                    let f3 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi + 1, zi, blocks),
                                is_solid(xi, yi + 1, zi + 1, blocks),
                                is_solid(xi - 1, yi + 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);

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
                        start_idx,
                        start_idx + 3,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 1,
                    ]);
                }

                // 下面 (-Y)
                if !is_solid(xi, yi - 1, zi, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi - 1, zi, blocks),
                                is_solid(xi, yi - 1, zi - 1, blocks),
                                is_solid(xi - 1, yi - 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);
                    let f1 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi - 1, zi, blocks),
                                is_solid(xi, yi - 1, zi - 1, blocks),
                                is_solid(xi + 1, yi - 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);
                    let f2 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi - 1, zi, blocks),
                                is_solid(xi, yi - 1, zi + 1, blocks),
                                is_solid(xi + 1, yi - 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);
                    let f3 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi - 1, zi, blocks),
                                is_solid(xi, yi - 1, zi + 1, blocks),
                                is_solid(xi - 1, yi - 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);

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
                        start_idx,
                        start_idx + 1,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 3,
                    ]);
                }

                // 後ろ面 (-Z)
                if !is_solid(xi, yi, zi - 1, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi, zi - 1, blocks),
                                is_solid(xi, yi - 1, zi - 1, blocks),
                                is_solid(xi - 1, yi - 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);
                    let f1 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi, zi - 1, blocks),
                                is_solid(xi, yi - 1, zi - 1, blocks),
                                is_solid(xi + 1, yi - 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);
                    let f2 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi, zi - 1, blocks),
                                is_solid(xi, yi + 1, zi - 1, blocks),
                                is_solid(xi + 1, yi + 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);
                    let f3 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi, zi - 1, blocks),
                                is_solid(xi, yi + 1, zi - 1, blocks),
                                is_solid(xi - 1, yi + 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);

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
                        start_idx,
                        start_idx + 3,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 1,
                    ]);
                }

                // 前面 (+Z)
                if !is_solid(xi, yi, zi + 1, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi, zi + 1, blocks),
                                is_solid(xi, yi - 1, zi + 1, blocks),
                                is_solid(xi - 1, yi - 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);
                    let f1 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi, zi + 1, blocks),
                                is_solid(xi, yi - 1, zi + 1, blocks),
                                is_solid(xi + 1, yi - 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);
                    let f2 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi, zi + 1, blocks),
                                is_solid(xi, yi + 1, zi + 1, blocks),
                                is_solid(xi + 1, yi + 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);
                    let f3 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi, zi + 1, blocks),
                                is_solid(xi, yi + 1, zi + 1, blocks),
                                is_solid(xi - 1, yi + 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);

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
                        start_idx,
                        start_idx + 1,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 3,
                    ]);
                }

                // 左面 (-X)
                if !is_solid(xi - 1, yi, zi, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi - 1, zi, blocks),
                                is_solid(xi - 1, yi, zi - 1, blocks),
                                is_solid(xi - 1, yi - 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);
                    let f1 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi + 1, zi, blocks),
                                is_solid(xi - 1, yi, zi - 1, blocks),
                                is_solid(xi - 1, yi + 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);
                    let f2 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi + 1, zi, blocks),
                                is_solid(xi - 1, yi, zi + 1, blocks),
                                is_solid(xi - 1, yi + 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);
                    let f3 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi - 1, yi - 1, zi, blocks),
                                is_solid(xi - 1, yi, zi + 1, blocks),
                                is_solid(xi - 1, yi - 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);

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
                        start_idx,
                        start_idx + 3,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 1,
                    ]);
                }

                // 右面 (+X)
                if !is_solid(xi + 1, yi, zi, blocks) {
                    let start_idx = vertices.len() as u32;

                    let f0 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi - 1, zi, blocks),
                                is_solid(xi + 1, yi, zi - 1, blocks),
                                is_solid(xi + 1, yi - 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);
                    let f1 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi - 1, zi, blocks),
                                is_solid(xi + 1, yi, zi + 1, blocks),
                                is_solid(xi + 1, yi - 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);
                    let f2 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi + 1, zi, blocks),
                                is_solid(xi + 1, yi, zi + 1, blocks),
                                is_solid(xi + 1, yi + 1, zi + 1, blocks),
                            ) as f32
                                / 3.0);
                    let f3 = 0.25
                        + 0.75
                            * (calc_ao(
                                is_solid(xi + 1, yi + 1, zi, blocks),
                                is_solid(xi + 1, yi, zi - 1, blocks),
                                is_solid(xi + 1, yi + 1, zi - 1, blocks),
                            ) as f32
                                / 3.0);

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
                        start_idx,
                        start_idx + 3,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 1,
                    ]);
                }
            }
        }
    }

    (vertices, indices)
}
