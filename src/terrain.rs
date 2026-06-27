use noise::NoiseFn;

const SEED: u32 = 142341311;

use crate::{game::{BlockType, InstanceRaw}, state::{CHUNK_AREA, CHUNK_SIZE, ChunkBlocks, MAX_HEIGHT}};

fn value_noise(x: f64, y: f64, z: f64, seed: u32) -> f64 {
    noise::Value::new(seed).get([x, y, z])
}

fn get_fbm(x: f64, y: f64, z: f64, seed: u32, octaves: u32) -> f64 {
    let mut sum = 0.0;
    let mut amplitude = 0.5;
    let mut frequency = 1.0;
    let mut max_val = 0.0;

    for i in 0..octaves {
        let n = value_noise(x * frequency, y * frequency, z * frequency, seed + i * 131);
        
        sum += n * amplitude;
        max_val += amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
    }

    sum / max_val
}

pub fn create_terrain() -> (Vec<InstanceRaw>, ChunkBlocks) {
    let mut blocks = [BlockType::Air; CHUNK_SIZE * MAX_HEIGHT * CHUNK_SIZE];
    let mut instances = Vec::new();

    let scale = 8.0;

    for x in 0..CHUNK_SIZE {
        for y in 0..MAX_HEIGHT {
            for z in 0..CHUNK_SIZE {
                let index = x * CHUNK_AREA + y * CHUNK_SIZE + z;
                if y == 0 {
                    blocks[index] = BlockType::Stone;
                    instances.push(InstanceRaw {
                        position: [x as f32, 0.0, z as f32],
                        block_type: 1,
                    });
                    continue;
                }

                // 高いほどバイアスを大きく
                let height_bias = y as f64 / CHUNK_SIZE as f64;
                // 座標をscaleで割りバイアスで引く
                let r = get_fbm(x as f64 / scale, y as f64 / scale, z as f64 / scale, SEED, 4) + height_bias;
                
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
                
                let world_x = x as f32;
                let world_y = y as f32;
                let world_z = z as f32;

                if block != BlockType::Air {
                    instances.push(InstanceRaw {
                        position: [world_x, world_y, world_z],
                        block_type: block as u32,
                    });
                }
            }
        }
    }

    (instances, blocks)
}
