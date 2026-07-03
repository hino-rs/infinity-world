use crate::consts::*;
use crate::create_terrain::surface_height;
use crate::game::BlockType;
use crate::terrain::ChunkBlocks;
use crate::noise::domain_warp;

pub struct Rle {
    count: u16,
    value: BlockType,
}

pub fn decompress(compressed: &Vec<Rle>) -> Vec<BlockType> {
    let mut blocks = Vec::with_capacity(8192);
    for data in compressed {
        let count = data.count;
        let value = data.value;
        blocks.extend(vec![value; count as usize]);
    }
    blocks
}

pub fn compress(blocks: &[BlockType; CHUNK_SIZE * MAX_HEIGHT * CHUNK_SIZE]) -> Vec<Rle> {
    let mut prev_block = blocks[0];
    let mut count = 0;
    let mut compressed = Vec::new();
    for block in blocks {
        if *block == prev_block {
            count += 1;
        } else {
            compressed.push(
                Rle {
                    count,
                    value: prev_block,
                }
            );
            prev_block = *block;
            count = 1;
        }
    }
    if count > 0 {
        compressed.push(
            Rle {
                count,
                value: prev_block,
            }
        );
    }
    compressed
}

pub fn get_block(compressed: &[Rle], index: usize) -> BlockType {
    let mut current_index = 0;
    for rle in compressed {
        let next_index = current_index + rle.count as usize;
        if index < next_index {
            return rle.value;
        }
        current_index = next_index;
    }
    BlockType::Air
}


pub fn create_chunk(chunk_x: i32, chunk_z: i32, seed: u32) -> ChunkBlocks {
    let mut blocks = [BlockType::Air; CHUNK_SIZE * MAX_HEIGHT * CHUNK_SIZE];

    for x in 0..CHUNK_SIZE {
        for z in 0..CHUNK_SIZE {
            let wx = (chunk_x * CHUNK_SIZE as i32 + x as i32) as f64;
            let wz = (chunk_z * CHUNK_SIZE as i32 + z as i32) as f64;

            // let h = surface_height(wx, wz, seed).clamp(1, MAX_HEIGHT as i32 - 1);
            let h = domain_warp(wx, wz, seed, 1.0, 320.0).clamp(1, MAX_HEIGHT as i32 - 1);

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
