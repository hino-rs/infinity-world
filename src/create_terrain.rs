use glam::IVec3;

use crate::consts::*;
use crate::noise::*;
use crate::{game::BlockType, terrain::*};

/// 地形の頂点データ
#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable)]
pub struct TerrainVertex {
    pub position: [f32; 3],
    pub tex_coords: [f32; 2],
    pub block_type: u32,
    pub ao_factor: f32,
    pub normal: [f32; 3],
}

impl TerrainVertex {
    pub fn none() -> Self {
        Self {
            position: [0.0, 0.0, 0.0],
            tex_coords: [0.0, 0.0],
            block_type: 0,
            ao_factor: 0.0,
            normal: [0.0, 0.0, 0.0],
        }
    }

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
                wgpu::VertexAttribute {
                    offset: 28,
                    shader_location: 4,
                    format: wgpu::VertexFormat::Float32x3,
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


/// 周辺ブロックが不透明ブロックかどうかを調べる。
/// チャンク外は空気(非ソリッド)とみなす。
pub fn is_solid(x: i32, y: i32, z: i32, blocks: &ChunkBlocks) -> bool {
    if x < 0 || x >= CHUNK_SIZE_I32 || y < 0 || y >= CHUNK_SIZE_I32 || z < 0 || z >= CHUNK_SIZE_I32
    {
        return false;
    }

    let index = Chunk::index(x, y, z);
    blocks[index] != BlockType::Air
}

type Mask = [[Option<(BlockType, [f32; 4])>; CHUNK_SIZE]; CHUNK_SIZE];

/// ブロック配列からAO付きグリーディメッシュを作る。
pub fn build_chunk_mesh(
    blocks: &Option<Box<ChunkBlocks>>,
    chunk_x: i32,
    chunk_y: i32,
    chunk_z: i32,
    camera_pos: IVec3,
) -> (Vec<TerrainVertex>, Vec<u32>) {
    let Some(blocks) = blocks else {
        return (vec![TerrainVertex::none()], vec![0]);
    };

    let mut vertices = Vec::new();
    let mut indices = Vec::new();

    // チャンクの左下隅のワールド座標
    let offset_x = (chunk_x * CHUNK_SIZE_I32) as f32;
    let offset_y = (chunk_y * CHUNK_SIZE_I32) as f32;
    let offset_z = (chunk_z * CHUNK_SIZE_I32) as f32;

    // --- 上面 (+Y) のグリーディメッシュ ---
    for y in 0..CHUNK_SIZE {
        let mut mask: Mask = [[None; CHUNK_SIZE]; CHUNK_SIZE];

        for x in 0..CHUNK_SIZE {
            for z in 0..CHUNK_SIZE {
                let xi = x as i32;
                let yi = y as i32;
                let zi = z as i32;

                if is_solid(xi, yi, zi, blocks) && !is_solid(xi, yi + 1, zi, blocks) {
                    let index = Chunk::index(x, y, z);
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
                    mask[x][z] = Some((blocks[index], [f0, f1, f2, f3]));
                }
            }
        }

        for z in 0..CHUNK_SIZE {
            for x in 0..CHUNK_SIZE {
                if let Some((block_type, ao_factors)) = mask[x][z] {
                    let mut width = 1;
                    while x + width < CHUNK_SIZE
                        && mask[x + width][z] == Some((block_type, ao_factors))
                    {
                        width += 1;
                    }

                    let mut height = 1;
                    'o: while z + height < CHUNK_SIZE {
                        for dx in 0..width {
                            if mask[x + dx][z + height] != Some((block_type, ao_factors)) {
                                break 'o;
                            }
                        }
                        height += 1;
                    }

                    let block_type_id = block_type as u32;
                    let bx = x as f32 + offset_x;
                    let by = y as f32 + offset_y;
                    let bz = z as f32 + offset_z;

                    let start_idx = vertices.len() as u32;

                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + 0.5, bz - 0.5],
                        tex_coords: [0.0, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[0],
                        normal: [0.0, 1.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + width as f32 - 0.5, by + 0.5, bz - 0.5],
                        tex_coords: [width as f32, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[1],
                        normal: [0.0, 1.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + width as f32 - 0.5, by + 0.5, bz + height as f32 - 0.5],
                        tex_coords: [width as f32, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[2],
                        normal: [0.0, 1.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + 0.5, bz + height as f32 - 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[3],
                        normal: [0.0, 1.0, 0.0],
                    });

                    indices.extend_from_slice(&[
                        start_idx,
                        start_idx + 3,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 1,
                    ]);

                    for dy in 0..height {
                        for dx in 0..width {
                            mask[x + dx][z + dy] = None;
                        }
                    }
                }
            }
        }
    }

    // --- 下面 (-Y) のグリーディメッシュ ---
    for y in 0..CHUNK_SIZE {
        let mut mask: Mask = [[None; CHUNK_SIZE]; CHUNK_SIZE];

        for x in 0..CHUNK_SIZE {
            for z in 0..CHUNK_SIZE {
                let xi = x as i32;
                let yi = y as i32;
                let zi = z as i32;

                if is_solid(xi, yi, zi, blocks) && !is_solid(xi, yi - 1, zi, blocks) {
                    let index = Chunk::index(x, y, z);
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
                    mask[x][z] = Some((blocks[index], [f0, f1, f2, f3]));
                }
            }
        }

        for z in 0..CHUNK_SIZE {
            for x in 0..CHUNK_SIZE {
                if let Some((block_type, ao_factors)) = mask[x][z] {
                    let mut width = 1;
                    while x + width < CHUNK_SIZE
                        && mask[x + width][z] == Some((block_type, ao_factors))
                    {
                        width += 1;
                    }

                    let mut height = 1;
                    'o: while z + height < CHUNK_SIZE {
                        for dx in 0..width {
                            if mask[x + dx][z + height] != Some((block_type, ao_factors)) {
                                break 'o;
                            }
                        }
                        height += 1;
                    }

                    let block_type_id = block_type as u32;
                    let bx = x as f32 + offset_x;
                    let by = y as f32 + offset_y;
                    let bz = z as f32 + offset_z;

                    let start_idx = vertices.len() as u32;

                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[0],
                        normal: [0.0, -1.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + width as f32 - 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [width as f32, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[1],
                        normal: [0.0, -1.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + width as f32 - 0.5, by - 0.5, bz + height as f32 - 0.5],
                        tex_coords: [width as f32, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[2],
                        normal: [0.0, -1.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz + height as f32 - 0.5],
                        tex_coords: [0.0, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[3],
                        normal: [0.0, -1.0, 0.0],
                    });

                    indices.extend_from_slice(&[
                        start_idx,
                        start_idx + 1,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 3,
                    ]);

                    for dy in 0..height {
                        for dx in 0..width {
                            mask[x + dx][z + dy] = None;
                        }
                    }
                }
            }
        }
    }

    // --- 後ろ面 (-Z) のグリーディメッシュ ---
    for z in 0..CHUNK_SIZE {
        let mut mask: Mask = [[None; CHUNK_SIZE]; CHUNK_SIZE];

        for x in 0..CHUNK_SIZE {
            for y in 0..CHUNK_SIZE {
                let xi = x as i32;
                let yi = y as i32;
                let zi = z as i32;

                if is_solid(xi, yi, zi, blocks) && !is_solid(xi, yi, zi - 1, blocks) {
                    let index = Chunk::index(x, y, z);
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
                    mask[x][y] = Some((blocks[index], [f0, f1, f2, f3]));
                }
            }
        }

        for y in 0..CHUNK_SIZE {
            for x in 0..CHUNK_SIZE {
                if let Some((block_type, ao_factors)) = mask[x][y] {
                    let mut width = 1;
                    while x + width < CHUNK_SIZE
                        && mask[x + width][y] == Some((block_type, ao_factors))
                    {
                        width += 1;
                    }

                    let mut height = 1;
                    'o: while y + height < CHUNK_SIZE {
                        for dx in 0..width {
                            if mask[x + dx][y + height] != Some((block_type, ao_factors)) {
                                break 'o;
                            }
                        }
                        height += 1;
                    }

                    let block_type_id = block_type as u32;
                    let bx = x as f32 + offset_x;
                    let by = y as f32 + offset_y;
                    let bz = z as f32 + offset_z;

                    let start_idx = vertices.len() as u32;

                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [0.0, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[0],
                        normal: [0.0, 0.0, -1.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + width as f32 - 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [width as f32, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[1],
                        normal: [0.0, 0.0, -1.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + width as f32 - 0.5, by + height as f32 - 0.5, bz - 0.5],
                        tex_coords: [width as f32, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[2],
                        normal: [0.0, 0.0, -1.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + height as f32 - 0.5, bz - 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[3],
                        normal: [0.0, 0.0, -1.0],
                    });

                    indices.extend_from_slice(&[
                        start_idx,
                        start_idx + 3,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 1,
                    ]);

                    for dy in 0..height {
                        for dx in 0..width {
                            mask[x + dx][y + dy] = None;
                        }
                    }
                }
            }
        }
    }

    // --- 前面 (+Z) のグリーディメッシュ ---
    for z in 0..CHUNK_SIZE {
        let mut mask: Mask = [[None; CHUNK_SIZE]; CHUNK_SIZE];

        for x in 0..CHUNK_SIZE {
            for y in 0..CHUNK_SIZE {
                let xi = x as i32;
                let yi = y as i32;
                let zi = z as i32;

                if is_solid(xi, yi, zi, blocks) && !is_solid(xi, yi, zi + 1, blocks) {
                    let index = Chunk::index(x, y, z);
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
                    mask[x][y] = Some((blocks[index], [f0, f1, f2, f3]));
                }
            }
        }

        for y in 0..CHUNK_SIZE {
            for x in 0..CHUNK_SIZE {
                if let Some((block_type, ao_factors)) = mask[x][y] {
                    let mut width = 1;
                    while x + width < CHUNK_SIZE
                        && mask[x + width][y] == Some((block_type, ao_factors))
                    {
                        width += 1;
                    }

                    let mut height = 1;
                    'o: while y + height < CHUNK_SIZE {
                        for dx in 0..width {
                            if mask[x + dx][y + height] != Some((block_type, ao_factors)) {
                                break 'o;
                            }
                        }
                        height += 1;
                    }

                    let block_type_id = block_type as u32;
                    let bx = x as f32 + offset_x;
                    let by = y as f32 + offset_y;
                    let bz = z as f32 + offset_z;

                    let start_idx = vertices.len() as u32;

                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz + 0.5],
                        tex_coords: [0.0, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[0],
                        normal: [0.0, 0.0, 1.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + width as f32 - 0.5, by - 0.5, bz + 0.5],
                        tex_coords: [width as f32, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[1],
                        normal: [0.0, 0.0, 1.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + width as f32 - 0.5, by + height as f32 - 0.5, bz + 0.5],
                        tex_coords: [width as f32, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[2],
                        normal: [0.0, 0.0, 1.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + height as f32 - 0.5, bz + 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[3],
                        normal: [0.0, 0.0, 1.0],
                    });

                    indices.extend_from_slice(&[
                        start_idx,
                        start_idx + 1,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 3,
                    ]);

                    for dy in 0..height {
                        for dx in 0..width {
                            mask[x + dx][y + dy] = None;
                        }
                    }
                }
            }
        }
    }

    // --- 左面 (-X) のグリーディメッシュ ---
    for x in 0..CHUNK_SIZE {
        let mut mask: Mask = [[None; CHUNK_SIZE]; CHUNK_SIZE];

        for z in 0..CHUNK_SIZE {
            for y in 0..CHUNK_SIZE {
                let xi = x as i32;
                let yi = y as i32;
                let zi = z as i32;

                if is_solid(xi, yi, zi, blocks) && !is_solid(xi - 1, yi, zi, blocks) {
                    let index = Chunk::index(x, y, z);
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
                    mask[z][y] = Some((blocks[index], [f0, f1, f2, f3]));
                }
            }
        }

        for y in 0..CHUNK_SIZE {
            for z in 0..CHUNK_SIZE {
                if let Some((block_type, ao_factors)) = mask[z][y] {
                    let mut width = 1;
                    while z + width < CHUNK_SIZE
                        && mask[z + width][y] == Some((block_type, ao_factors))
                    {
                        width += 1;
                    }

                    let mut height = 1;
                    'o: while y + height < CHUNK_SIZE {
                        for dz in 0..width {
                            if mask[z + dz][y + height] != Some((block_type, ao_factors)) {
                                break 'o;
                            }
                        }
                        height += 1;
                    }

                    let block_type_id = block_type as u32;
                    let bx = x as f32 + offset_x;
                    let by = y as f32 + offset_y;
                    let bz = z as f32 + offset_z;

                    let start_idx = vertices.len() as u32;

                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [0.0, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[0],
                        normal: [-1.0, 0.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + height as f32 - 0.5, bz - 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[1],
                        normal: [-1.0, 0.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by + height as f32 - 0.5, bz + width as f32 - 0.5],
                        tex_coords: [width as f32, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[2],
                        normal: [-1.0, 0.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx - 0.5, by - 0.5, bz + width as f32 - 0.5],
                        tex_coords: [width as f32, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[3],
                        normal: [-1.0, 0.0, 0.0],
                    });

                    indices.extend_from_slice(&[
                        start_idx,
                        start_idx + 3,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 1,
                    ]);

                    for dy in 0..height {
                        for dz in 0..width {
                            mask[z + dz][y + dy] = None;
                        }
                    }
                }
            }
        }
    }

    // --- 右面 (+X) のグリーディメッシュ ---
    for x in 0..CHUNK_SIZE {
        let mut mask: Mask = [[None; CHUNK_SIZE]; CHUNK_SIZE];

        for z in 0..CHUNK_SIZE {
            for y in 0..CHUNK_SIZE {
                let xi = x as i32;
                let yi = y as i32;
                let zi = z as i32;

                if is_solid(xi, yi, zi, blocks) && !is_solid(xi + 1, yi, zi, blocks) {
                    let index = Chunk::index(x, y, z);
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
                    mask[z][y] = Some((blocks[index], [f0, f1, f2, f3]));
                }
            }
        }

        for y in 0..CHUNK_SIZE {
            for z in 0..CHUNK_SIZE {
                if let Some((block_type, ao_factors)) = mask[z][y] {
                    let mut width = 1;
                    while z + width < CHUNK_SIZE
                        && mask[z + width][y] == Some((block_type, ao_factors))
                    {
                        width += 1;
                    }

                    let mut height = 1;
                    'o: while y + height < CHUNK_SIZE {
                        for dz in 0..width {
                            if mask[z + dz][y + height] != Some((block_type, ao_factors)) {
                                break 'o;
                            }
                        }
                        height += 1;
                    }

                    let block_type_id = block_type as u32;
                    let bx = x as f32 + offset_x;
                    let by = y as f32 + offset_y;
                    let bz = z as f32 + offset_z;

                    let start_idx = vertices.len() as u32;

                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by - 0.5, bz - 0.5],
                        tex_coords: [width as f32, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[0],
                        normal: [1.0, 0.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by - 0.5, bz + width as f32 - 0.5],
                        tex_coords: [0.0, height as f32],
                        block_type: block_type_id,
                        ao_factor: ao_factors[1],
                        normal: [1.0, 0.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by + height as f32 - 0.5, bz + width as f32 - 0.5],
                        tex_coords: [0.0, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[2],
                        normal: [1.0, 0.0, 0.0],
                    });
                    vertices.push(TerrainVertex {
                        position: [bx + 0.5, by + height as f32 - 0.5, bz - 0.5],
                        tex_coords: [width as f32, 0.0],
                        block_type: block_type_id,
                        ao_factor: ao_factors[3],
                        normal: [1.0, 0.0, 0.0],
                    });

                    indices.extend_from_slice(&[
                        start_idx,
                        start_idx + 3,
                        start_idx + 2,
                        start_idx,
                        start_idx + 2,
                        start_idx + 1,
                    ]);

                    for dy in 0..height {
                        for dz in 0..width {
                            mask[z + dz][y + dy] = None;
                        }
                    }
                }
            }
        }
    }

    (vertices, indices)
}
