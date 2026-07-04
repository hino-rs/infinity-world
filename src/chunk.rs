use crate::consts::*;
use crate::game::BlockType;
use crate::noise::domain_warp;
use crate::terrain::{Chunk, ChunkBlocks};

#[derive(Debug)]
pub struct Rle {
    count: u16,
    value: BlockType,
}

// pub fn decompress(compressed: &Vec<Rle>) -> Vec<BlockType> {
//     let mut blocks = Vec::with_capacity(8192);
//     for data in compressed {
//         let count = data.count;
//         let value = data.value;
//         blocks.extend(vec![value; count as usize]);
//     }
//     blocks
// }

pub fn compress(blocks: &Option<ChunkBlocks>) -> Option<Vec<Rle>> {
    let Some(blocks) = blocks else {
        return None;
    };
    let mut prev_block = blocks[0];
    let mut count = 0;
    let mut compressed = Vec::new();
    for block in blocks {
        if *block == prev_block {
            count += 1;
        } else {
            compressed.push(Rle {
                count,
                value: prev_block,
            });
            prev_block = *block;
            count = 1;
        }
    }
    if count == blocks.len() as u16 {
        if prev_block == BlockType::Air {
            return None;
        }
    }
    if count > 0 {
        compressed.push(Rle {
            count,
            value: prev_block,
        });
    }

    Some(compressed)
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

pub fn create_chunk(chunk_x: i32, chunk_y: i32, chunk_z: i32, seed: u32) -> (Option<ChunkBlocks>, bool) {
    let now = std::time::Instant::now();

    let mut blocks = [BlockType::Air; NUM_CHUNK_BLOCKS];
    let mut air_count = 0;

    if (chunk_y * CHUNK_SIZE as i32) > MAX_HEIGHT || chunk_y < 0 {
        return (None, true);
    }; 

    for x in 0..CHUNK_SIZE {
        for z in 0..CHUNK_SIZE {
            let wx = (chunk_x * CHUNK_SIZE as i32 + x as i32) as f64;
            let wz = (chunk_z * CHUNK_SIZE as i32 + z as i32) as f64;

            let r = domain_warp(wx, 0.0, wz, seed, 1.0, 320.0);
            let h = (r * 32.0 * 3.0 + CHUNK_SIZE as f64).round() as i32;

            for y in 0..CHUNK_SIZE {
                let wy = chunk_y * CHUNK_SIZE as i32 + y as i32;
                let index = Chunk::index(x, y, z);

                if wy <= h {
                    blocks[index] = if wy == h {
                        if h > 45 { BlockType::Stone } else { BlockType::Grass }
                    } else if wy >= h - DIRT_DEPTH {
                        BlockType::Dirt
                    } else {
                        BlockType::Stone
                    };
                } else if wy < SEA_LEVEL as i32 {
                    blocks[index] = BlockType::Water;
                } else {
                    blocks[index] = BlockType::Air;
                }

                if blocks[index] == BlockType::Air {
                    air_count += 1;
                }
            }
            
        }
    }

    println!("{}", now.elapsed().as_secs_f64());
    if air_count == NUM_CHUNK_BLOCKS {
        return (None, true);
    }
    (Some(blocks), false)
}
