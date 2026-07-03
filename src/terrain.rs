use std::collections::HashMap;

use glam::{Vec2, Vec3};
use rayon::prelude::*;
use web_time::Instant;
use wgpu::util::DeviceExt;

use crate::camera::Camera;
use crate::chunk::Rle;
use crate::game::BlockType::Air;
use crate::utils::XZi;
use crate::{chunk, create_terrain};
use crate::{consts::*, game::BlockType, player::Aabb};

pub type ChunkBlocks = [BlockType; CHUNK_SIZE * MAX_HEIGHT * CHUNK_SIZE];

pub struct Chunk {
    pub coord: (i32, i32),
    pub blocks: Vec<Rle>,
    pub vertex_buffer: wgpu::Buffer,
    pub index_buffer: wgpu::Buffer,
    pub num_indices: u32,

    pub storage_buffer: wgpu::Buffer,
    pub bind_group: wgpu::BindGroup,
}

type ChunkPos = (i32, i32);
type Chunks = HashMap<ChunkPos, Chunk>;

pub struct Terrain {
    pub chunks: Chunks,
}

impl Terrain {
    pub fn clear_chunks(&mut self, center: XZi) {
        let mut remove_poses = Vec::new();
        for chunk_pos in self.chunks.keys() {
            let (cx, cz) = *chunk_pos;
            // 最も外のチャンク
            let ox = center.x.div_euclid(CHUNK_SIZE as i32) + RADIUS;
            let oz = center.z.div_euclid(CHUNK_SIZE as i32) + RADIUS;

            if (cx > ox) || (cz > oz) {
                remove_poses.push((cx, cz));
            }
        }

        for remove_pos in remove_poses {
            self.chunks.remove(&remove_pos);
        }
    }

    pub fn add_chunks(&mut self, device: &wgpu::Device, seed: u32, center: XZi, layout: &wgpu::BindGroupLayout) {
        let mut coords = Vec::new();

        // 現在地が位置するチャンク
        let cx = center.x.div_euclid(CHUNK_SIZE as i32);
        let cz = center.z.div_euclid(CHUNK_SIZE as i32);

        for z in cz - RADIUS..=cz + RADIUS {
            for x in cx - RADIUS..=cx + RADIUS {
                if !self.chunks.get(&(x, z)).is_some() {
                    if coords.len() > 3 {
                        break;
                    }
                    coords.push((x, z));
                }
            }
        }

        if coords.len() == 0 {
            return;
        } else {
            // println!("{}チャンク追加します。", coords.len());
        }

        // CPU処理だけ並列化
        let cpu_results: Vec<_> = coords
            .par_iter()
            .map(|&(cx, cz)| {
                let blocks = chunk::create_chunk(cx, cz, seed);
                let (verts, inds) = create_terrain::build_chunk_mesh(&blocks, cx, cz);
                (cx, cz, blocks, verts, inds)
            })
            .collect();

        for (cx, cz, blocks, verts, inds) in cpu_results {
            let vertex_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
                label: Some("Chunk Vertex Buffer"),
                contents: bytemuck::cast_slice(&verts),
                usage: wgpu::BufferUsages::VERTEX,
            });
            let index_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
                label: Some("Chunk Index Buffer"),
                contents: bytemuck::cast_slice(&inds),
                usage: wgpu::BufferUsages::INDEX,
            });

            let (storage_buffer, bind_group) = create_chunk_storage(&device, layout, &blocks);

            self.chunks.entry((cx, cz)).or_insert(Chunk {
                coord: (cx, cz),
                blocks: chunk::compress(&blocks),
                vertex_buffer,
                index_buffer,
                num_indices: inds.len() as u32,
                storage_buffer,
                bind_group,
            });
        }
    }

    // 最初は初期ポジが位置するチャンクだけ作る
    pub fn new(device: &wgpu::Device, seed: u32, initial_position: Vec3, layout: &wgpu::BindGroupLayout) -> Self {
        let x = initial_position.x;
        let z = initial_position.z;

        let cx = x.div_euclid(CHUNK_SIZE as f32) as i32;
        let cz = z.div_euclid(CHUNK_SIZE as f32) as i32;

        let blocks = chunk::create_chunk(cx, cz, seed);
        let (verts, inds) = create_terrain::build_chunk_mesh(&blocks, cx, cz);

        let vertex_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Chunk Vertex Buffer"),
            contents: bytemuck::cast_slice(&verts),
            usage: wgpu::BufferUsages::VERTEX,
        });
        let index_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Chunk Index Buffer"),
            contents: bytemuck::cast_slice(&inds),
            usage: wgpu::BufferUsages::INDEX,
        });

        let (storage_buffer, bind_group) = create_chunk_storage(&device, layout, &blocks);

        Self {
            chunks: HashMap::from([(
                (cx, cz),
                Chunk {
                    coord: (cx, cz),
                    blocks: chunk::compress(&blocks),
                    vertex_buffer,
                    index_buffer,
                    num_indices: inds.len() as u32,
                    storage_buffer,
                    bind_group,
                },
            )]),
        }
    }

    // 指定のワールド座標がソリッドか
    pub fn is_solid_world(&self, wx: i32, wy: i32, wz: i32) -> bool {
        self.block_at_world(wx, wy, wz) != BlockType::Air
    }

    // プレイヤーAABBが地形と重なっているか
    pub fn collides_at(&self, aabb: Aabb) -> bool {
        let aabb = Aabb::decompress(aabb);

        // --- AABBが触れうるブロックセルの範囲を求める ---
        let x0 = (aabb.min_x + 0.5).floor() as i32;
        let x1 = (aabb.max_x + 0.5).floor() as i32;
        let y0 = (aabb.min_y + 0.5).floor() as i32;
        let y1 = (aabb.max_y + 0.5).floor() as i32;
        let z0 = (aabb.min_z + 0.5).floor() as i32;
        let z1 = (aabb.max_z + 0.5).floor() as i32;

        for wx in x0..=x1 {
            for wy in y0..=y1 {
                for wz in z0..=z1 {
                    if self.is_solid_world(wx, wy, wz) {
                        return true;
                    }
                }
            }
        }
        false
    }

    // 指定のワールド座標のブロックを返す
    pub fn block_at_world(&self, wx: i32, wy: i32, wz: i32) -> BlockType {
        if wy < 0 || wy >= MAX_HEIGHT as i32 {
            return Air;
        }

        // ワールド座標をチャンク座標+チャンク内ローカル座標に分解
        let cx = wx.div_euclid(CHUNK_SIZE as i32);
        let cz = wz.div_euclid(CHUNK_SIZE as i32);
        let lx = wx.rem_euclid(CHUNK_SIZE as i32);
        let lz = wz.rem_euclid(CHUNK_SIZE as i32);

        // 該当チャンクを探す
        // let Some(chunk) = self.chunks.iter().find(|c| c.coord == (cx, cz)) else {
        //     return Air;
        // };

        let Some(chunk) = self.chunks.get(&((cx, cz))) else {
            return Air;
        };

        let index = (lx as usize) * X_STRIDE + (wy as usize) * CHUNK_SIZE + (lz as usize);
        chunk::get_block(&chunk.blocks, index)
    }

    pub fn chunks_in_view(&self, camera: &Camera) -> Vec<ChunkPos> {
        let mut positions: Vec<ChunkPos> = Vec::with_capacity(((RADIUS*2+1)*RADIUS) as usize);
        let pcx = camera.eye.x.div_euclid(CHUNK_SIZE as f32) as i32;
        let pcz = camera.eye.z.div_euclid(CHUNK_SIZE as f32) as i32;

        for chunk_pos in self.chunks.keys() {
            let (cx, cz) = *chunk_pos;
            if pcx == cx && pcz == cz {
                positions.push((pcx, pcz))
            } else {
                let (wx, wz) = (cx * CHUNK_SIZE as i32, cz * CHUNK_SIZE as i32);
                if camera.is_point_in_frustum(Vec3::new(wx as f32, 0.0, wz as f32)) {
                    positions.push((cx, cz))
                }
            }
        }
        
        positions
    }
}

fn create_chunk_storage(
    device: &wgpu::Device,
    layout: &wgpu::BindGroupLayout,
    blocks: &ChunkBlocks,
) -> (wgpu::Buffer, wgpu::BindGroup) {
    let raw_blocks: Vec<u32> = blocks.iter().map(|&b| b as u32).collect();

    use wgpu::util::DeviceExt;
    let storage_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
        label: Some("Chunk Storage Buffer"),
        contents: bytemuck::cast_slice(&raw_blocks),
        usage: wgpu::BufferUsages::STORAGE | wgpu::BufferUsages::COPY_DST,
    });

    let bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
        label: Some("Chunk Storage Bind Group"),
        layout,
        entries: &[wgpu::BindGroupEntry {
            binding: 0,
            resource: storage_buffer.as_entire_binding(),
        }],
    });

    (storage_buffer, bind_group)
}
