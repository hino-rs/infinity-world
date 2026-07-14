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

/// ブロック情報をRLE形式へ変換する。
/// ブロックか空だった場合や、すべて空気だった場合はNoneを返す。
pub fn compress(blocks: &Option<Box<ChunkBlocks>>) -> Option<Vec<Rle>> {
    let Some(blocks) = blocks else {
        return None;
    };
    let mut prev_block = blocks[0];
    let mut count = 0;
    let mut compressed = Vec::new();
    for block in blocks.iter() {
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
    if count == blocks.len() as u16 && prev_block == BlockType::Air {
        return None;
    }
    if count > 0 {
        compressed.push(Rle {
            count,
            value: prev_block,
        });
    }

    Some(compressed)
}

/// RLE形式の配列から、展開後に指定インデクスが該当するブロックタイプを返す。
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
