use glam::Vec2;
use web_time::Instant;
use rayon::prelude::*;
use wgpu::util::DeviceExt;

use crate::game::BlockType::Air;
use crate::utils::XZi;
use crate::{consts::*, game::BlockType, player::Aabb};
use crate::create_terrain;

pub type ChunkBlocks = [BlockType; CHUNK_SIZE * MAX_HEIGHT * CHUNK_SIZE];

pub struct Chunk {
    pub coord: (i32, i32),
    pub blocks: ChunkBlocks,
    pub vertex_buffer: wgpu::Buffer,
    pub index_buffer: wgpu::Buffer,
    pub num_indices: u32,
}

pub struct Terrain {
    pub chunks: Vec<Chunk>,
    pub genelated: Vec<(i32, i32)>,
}

impl Terrain {
    pub fn add_chunk(&mut self, x: i32, z: i32, seed: u32, device: &wgpu::Device) {
        let blocks = create_terrain::create_chunk(x, z, seed);
        let (verts, inds) = create_terrain::build_chunk_mesh(&blocks, x, z);
        
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

        self.chunks.push(Chunk {
            coord: (x, z),
            blocks,
            vertex_buffer,
            index_buffer,
            num_indices: inds.len() as u32,
        });
        self.genelated.push((x, z));
    }

    pub fn genelated(&self, target: (i32, i32)) -> bool {
        for g in &self.genelated {
            if *g == target {
                return true;
            }
        }
        false
    }

    pub fn add_chunks(&mut self, device: &wgpu::Device, seed: u32, center: XZi) {
        let neighbor = [
            // (-1, -1),
            // (-1,  0),
            // (-1,  1),

            // ( 0,  1),
            // ( 0, -1),

            // ( 1,  1),
            // ( 1,  0),
            // ( 1, -1),


            (-2, -2),
            (-2, -1),
            (-2,  0),
            (-2,  1),
            (-2,  2),

            (-1, -2),
            (-1, -1),
            (-1,  0),
            (-1,  1),
            (-1,  2),

            ( 0, -2),
            ( 0, -1),
            // ( 0,  0),
            ( 0,  1),
            ( 0,  2),

            ( 1, -2),
            ( 1, -1),
            ( 1,  0),
            ( 1,  1),
            ( 1,  2),

            ( 2, -2),
            ( 2, -1),
            ( 2,  0),
            ( 2,  1),
            ( 2,  2),
        ];

        // let coords1: Vec<(i32, i32)> = (-RADIUS..=RADIUS)
        //     .flat_map(|cx| (0..=RADIUS).map(move |cz| (cx+center_x, cz+center_z)))
        //     .collect();

        let mut coords1 = Vec::new();
        for n in neighbor {
            let x = n.0 + center.x;
            let z = n.1 + center.z;

            let cx = x.div_euclid(CHUNK_SIZE as i32);
            let cz = z.div_euclid(CHUNK_SIZE as i32);
            
            coords1.push((cx, cz));
        }

        let mut coords = Vec::new();
        coords1.iter().for_each(|pos| {
            if !self.genelated(*pos) {
                coords.push(*pos);
            }
        });

        if coords.len() == 0 {
            return;
        } else {
            println!("チャンクを生成します");
        }

        // CPU処理だけ並列化
        let cpu_results: Vec<_> = coords
            .par_iter()
            .map(|&(cx, cz)| {
                println!("{cx}:{cz}");
                let blocks = create_terrain::create_chunk(cx, cz, seed);
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
            self.chunks.push(Chunk {
                coord: (cx, cz),
                blocks,
                vertex_buffer,
                index_buffer,
                num_indices: inds.len() as u32,
            });
            self.genelated.push((cx, cz));
        }
    }

    pub fn new(device: &wgpu::Device, seed: u32) -> Self {
        let now = Instant::now();
        // 座標リストを作る
        let coords: Vec<(i32, i32)> = (-RADIUS..=RADIUS)
            .flat_map(|cx| (-RADIUS..=RADIUS).map(move |cz| (cx, cz)))
            .collect();

        // CPU処理だけ並列化
        let cpu_results: Vec<_> = coords
            .par_iter()
            .map(|&(cx, cz)| {
                let blocks = create_terrain::create_chunk(cx, cz, seed);
                let (verts, inds) = create_terrain::build_chunk_mesh(&blocks, cx, cz);
                (cx, cz, blocks, verts, inds)
            })
            .collect();

        let mut chunks = Vec::with_capacity(cpu_results.len());
        let mut genelated = Vec::new();
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
            chunks.push(Chunk {
                coord: (cx, cz),
                blocks,
                vertex_buffer,
                index_buffer,
                num_indices: inds.len() as u32,
            });
            genelated.push((cx, cz));
        }
        println!(
            "地形生成とメッシュ作成にかかった時間: {}ms",
            now.elapsed().as_millis()
        );

        Self {
            chunks,
            genelated,
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

        for wx in x0..=x1  {
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
        if wy < 0 || wy >= MAX_HEIGHT as i32 { return Air; }

        // ワールド座標をチャンク座標+チャンク内ローカル座標に分解
        let cx = wx.div_euclid(CHUNK_SIZE as i32);
        let cz = wz.div_euclid(CHUNK_SIZE as i32);
        let lx = wx.rem_euclid(CHUNK_SIZE as i32);
        let lz = wz.rem_euclid(CHUNK_SIZE as i32);

        // 該当チャンクを探す
        let Some(chunk) = self.chunks.iter().find(|c| c.coord == (cx, cz)) else {
            return Air;
        };

        let index = (lx as usize) * X_STRIDE + (wy as usize) * CHUNK_SIZE + (lz as usize);
        chunk.blocks[index]
    }
}
