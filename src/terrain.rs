use std::collections::{HashMap, HashSet, VecDeque};
use std::sync::mpsc;

use glam::{IVec3, Mat4, Vec3};
use num_traits::{AsPrimitive, Num};
use wgpu::util::DeviceExt;

use crate::camera::Camera;
use crate::chunk::Rle;
use crate::compute::{ChunkUniforms, Compute};
use crate::game::BlockType::Air;
use crate::{chunk, create_terrain};
use crate::{consts::*, game::BlockType, player::Aabb};

pub type ChunkBlocks = [BlockType; NUM_CHUNK_BLOCKS];

#[derive(Debug)]
pub struct Chunk {
    pub blocks: Option<Vec<Rle>>,
    pub vertex_buffer: wgpu::Buffer,
    pub index_buffer: wgpu::Buffer,
    pub num_indices: u32,
    pub bind_group: Option<wgpu::BindGroup>,
}

impl Chunk {
    #[inline(always)]
    #[must_use]
    pub fn index<T>(x: T, y: T, z: T) -> usize
    where
        T: Num + Copy + AsPrimitive<usize>,
    {
        y.as_() * (CHUNK_SIZE * CHUNK_SIZE) + x.as_() * CHUNK_SIZE + z.as_()
    }
}

type ChunkPos = (i32, i32, i32);
type Chunks = HashMap<ChunkPos, Chunk>;

pub struct ChunkResult {
    pub pos: ChunkPos,
    pub blocks: Option<Box<ChunkBlocks>>,
    pub compressed: Option<Vec<Rle>>,
    pub verts: Vec<crate::create_terrain::TerrainVertex>,
    pub inds: Vec<u32>,
}

pub struct Terrain {
    pub chunks: Chunks,
    // メインスレッド側で計算済みチャンクデータを受信するため
    pub chunk_rx: mpsc::Receiver<ChunkResult>,
    // Rayonタスクから計算済みチャンクデータを送信するため
    pub chunk_tx: mpsc::Sender<ChunkResult>,
    // 現在生成中のチャンクを追跡するため
    pub chunk_in_progress: HashSet<ChunkPos>,
}

impl Terrain {
    pub fn clear_chunks(&mut self, center: IVec3, vp: &Mat4) {
        let cx_player = center.x.div_euclid(CHUNK_SIZE_I32);
        let cy_player = center.y.div_euclid(CHUNK_SIZE_I32);
        let cz_player = center.z.div_euclid(CHUNK_SIZE_I32);

        let threshold = 16;

        let mut remove_poses = Vec::new();
        for &chunk_pos in self.chunks.keys() {
            let (cx, cy, cz) = chunk_pos;
            
            let dx = (cx - cx_player).abs();
            let dy = (cy - cy_player).abs();
            let dz = (cz - cz_player).abs();

            // 描画距離以上はもちろん掃除する
            if dx > RADIUS || dy > Y_RADIUS || dz > RADIUS {
                remove_poses.push(chunk_pos);
                continue;
            }

            // threshold未満は無条件に掃除しない
            if dx < threshold && dy < threshold && dz < threshold {
                continue;
            }

            let min_pos = Vec3::new(
                (cx * CHUNK_SIZE_I32) as f32,
                (cy * CHUNK_SIZE_I32) as f32,
                (cz * CHUNK_SIZE_I32) as f32,
            );
            let max_pos = min_pos + Vec3::splat(CHUNK_SIZE_F32);

            // 視錐台カリング的に掃除する
            if !Camera::is_aabb_in_frustum(min_pos, max_pos, vp) {
                remove_poses.push(chunk_pos);
            }
        }

        for remove_pos in remove_poses {
            self.chunks.remove(&remove_pos);
        }
    }

    pub fn add_chunks(
        &mut self,
        device: &wgpu::Device,
        seed: i32,
        center: IVec3,
        layout: &wgpu::BindGroupLayout,
        camera: &Camera,
        compute: &Compute,
        queue: &wgpu::Queue,
        vp: &Mat4,
    ) {
        // --- 計算結果の受信とGPUバッファの作成 ---
        let cx_player = center.x.div_euclid(CHUNK_SIZE_I32);
        let cy_player = center.y.div_euclid(CHUNK_SIZE_I32);
        let cz_player = center.z.div_euclid(CHUNK_SIZE_I32);

        let threshold = RADIUS + 1;

        while let Ok(result) = self.chunk_rx.try_recv() {
            let ChunkResult {
                pos,
                blocks,
                compressed,
                verts,
                inds,
            } = result;
            self.chunk_in_progress.remove(&pos);

            let (cx, cy, cz) = pos;
            if (cx - cx_player).abs() > threshold
                || (cy - cy_player).abs() > threshold
                || (cz - cz_player).abs() > threshold
            {
                continue;
            }

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

            let (_storage_buffer, bind_group) = create_chunk_storage(device, layout, &blocks);

            self.chunks.entry((cx, cy, cz)).or_insert(Chunk {
                blocks: compressed,
                vertex_buffer,
                index_buffer,
                num_indices: inds.len() as u32,
                bind_group,
            });
        }

        // --- 新規生成が必要なチャンク座標の探索 ---
        let max_pending = 32;
        if self.chunk_in_progress.len() >= max_pending {
            return;
        }

        let max_to_spawn = max_pending - self.chunk_in_progress.len();

        let cx = center.x.div_euclid(CHUNK_SIZE_I32);
        let cy = center.y.div_euclid(CHUNK_SIZE_I32);
        let cz = center.z.div_euclid(CHUNK_SIZE_I32);

        let start_pos = (cx, cy, cz);
        let mut gen_queue = VecDeque::new();
        gen_queue.push_back(start_pos);
        let mut visited = HashSet::new();
        visited.insert(start_pos);

        let mut coords = Vec::new();

        while let Some(pos) = gen_queue.pop_front() {
            let (px, py, pz) = pos;

            // 範囲外なら探索をスキップ
            if (px - cx).abs() > RADIUS
                || (py - cy).abs() > Y_RADIUS
                || (pz - cz).abs() > RADIUS
                || py < 0
            {
                continue;
            }

            // 視野内かつ未生成のチャンクであれば生成対象に追加
            let min_pos = Vec3::new(
                (px * CHUNK_SIZE_I32) as f32,
                (py * CHUNK_SIZE_I32) as f32,
                (pz * CHUNK_SIZE_I32) as f32,
            );
            let max_pos = min_pos + Vec3::splat(CHUNK_SIZE_F32);

            if Camera::is_aabb_in_frustum(min_pos, max_pos, &vp) {
                if !self.chunks.contains_key(&pos) && !self.chunk_in_progress.contains(&pos) {
                    coords.push(pos);
                    if coords.len() >= max_to_spawn {
                        break;
                    }
                }
            }
            // 隣接する6方向のチャンクをキューに追加
            for (dx, dy, dz) in &[
                (1, 0, 0),
                (-1, 0, 0),
                (0, 1, 0),
                (0, -1, 0),
                (0, 0, 1),
                (0, 0, -1),
            ] {
                let neighbor = (px + dx, py + dy, pz + dz);
                if visited.insert(neighbor) {
                    gen_queue.push_back(neighbor);
                }
            }
        }
        let camera_pos = camera.eye;

        // --- Rayonでの非同期生成の送信 ---
        while !coords.is_empty() {
            let mut chunk_uniforms = Vec::with_capacity(16);
            let mut batch_coords = Vec::with_capacity(16);

            for _ in 0..16 {
                if let Some((cx, cy, cz)) = coords.pop() {
                    self.chunk_in_progress.insert((cx, cy, cz));
                    batch_coords.push((cx, cy, cz));

                    chunk_uniforms.push(ChunkUniforms {
                        chunk_pos: [cx, cy, cz],
                        seed,
                    });
                } else {
                    chunk_uniforms.push(ChunkUniforms {
                        chunk_pos: [0, 0, 0],
                        seed,
                    });
                }
            }

            compute.update(device, queue, &chunk_uniforms);
            let chunks = compute.get(device);

            if let Some(ref chunk) = chunks {
                for (blocks, &(cx, cy, cz)) in chunk.iter().zip(&batch_coords) {
                    let tx = self.chunk_tx.clone();
                    let blocks = Some(blocks.clone());

                    rayon::spawn(move || {
                        let (verts, inds) = create_terrain::build_chunk_mesh(
                            &blocks,
                            cx,
                            cy,
                            cz,
                            camera_pos.as_ivec3(),
                        );
                        let compressed = chunk::compress(&blocks);

                        let _ = tx.send(ChunkResult {
                            pos: (cx, cy, cz),
                            blocks,
                            compressed,
                            verts,
                            inds,
                        });
                    });
                }
            }
        }

        // for &(cx, cy, cz) in &coords {
        //     self.chunk_in_progress.insert((cx, cy, cz));
        //     let tx = self.chunk_tx.clone();

        //     compute.update(device, queue, [cx, cy, cz], seed);
        //     let blocks = compute.get(device);

        //     rayon::spawn(move || {
        //         let (verts, inds) =
        //             create_terrain::build_chunk_mesh(&blocks, cx, cy, cz, camera_pos.as_ivec3());
        //         let compressed = chunk::compress(&blocks);

        //         let _ = tx.send(ChunkResult {
        //             pos: (cx, cy, cz),
        //             blocks,
        //             compressed,
        //             verts,
        //             inds,
        //         });
        //     });
        // }
    }

    // 最初は初期ポジのXZに位置するチャンクだけ作る
    pub fn new() -> Self {
        let (chunk_tx, chunk_rx) = mpsc::channel();

        Self {
            chunks: HashMap::new(),
            chunk_rx,
            chunk_tx,
            chunk_in_progress: HashSet::new(),
        }
    }

    // 指定のワールド座標がソリッドか
    pub fn is_solid_world(&self, wx: i32, wy: i32, wz: i32) -> bool {
        let block = self.block_at_world(wx, wy, wz);
        block != BlockType::Air && block != BlockType::Water
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
        // if wy < 0 || wy >= CHUNK_SIZE_I32 {
        //     return Air;
        // }
        if wy < 0 {
            return Air;
        }

        // ワールド座標をチャンク座標+チャンク内ローカル座標に分解
        let cx = wx.div_euclid(CHUNK_SIZE_I32);
        let cy = wy.div_euclid(CHUNK_SIZE_I32);
        let cz = wz.div_euclid(CHUNK_SIZE_I32);
        let lx = wx.rem_euclid(CHUNK_SIZE_I32);
        let ly = wy.rem_euclid(CHUNK_SIZE_I32);
        let lz = wz.rem_euclid(CHUNK_SIZE_I32);

        // 該当チャンクを探す
        // let Some(chunk) = self.chunks.iter().find(|c| c.coord == (cx, cz)) else {
        //     return Air;
        // };

        let Some(chunk) = self.chunks.get(&(cx, cy, cz)) else {
            return Air;
        };

        let Some(blocks) = chunk.blocks.as_ref() else {
            return Air;
        };

        let index =
            (lx as usize) * CHUNK_SIZE + (ly as usize) * (CHUNK_SIZE * CHUNK_SIZE) + (lz as usize);
        // let index = Chunk::index(lx, ly, lz);
        chunk::get_block(&blocks, index)
    }

    pub fn chunks_in_view(&self, camera: &Camera) -> Vec<ChunkPos> {
        let mut positions: Vec<ChunkPos> = Vec::with_capacity(((RADIUS * 2 + 1) * RADIUS) as usize);
        let pcx = camera.eye.x.div_euclid(CHUNK_SIZE_F32) as i32;
        let pcz = camera.eye.z.div_euclid(CHUNK_SIZE_F32) as i32;
        let vp = camera.build_view_projection_matrix(100.0);

        for chunk_pos in self.chunks.keys() {
            let (cx, cy, cz) = *chunk_pos;
            if pcx == cx && pcz == cz {
                positions.push((pcx, cy, pcz))
            } else {
                let size = CHUNK_SIZE_I32;
                let (wx, wy, wz) = (cx * size, cy * size, cz * size);

                if Camera::is_point_in_frustum(Vec3::new(wx as f32, wy as f32, wz as f32), &vp) {
                    positions.push((cx, cy, cz))
                }
            }
        }

        positions
    }
}

fn create_chunk_storage(
    device: &wgpu::Device,
    layout: &wgpu::BindGroupLayout,
    blocks: &Option<Box<ChunkBlocks>>,
) -> (Option<wgpu::Buffer>, Option<wgpu::BindGroup>) {
    let Some(blocks) = blocks else {
        return (None, None);
    };

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

    (Some(storage_buffer), Some(bind_group))
}
