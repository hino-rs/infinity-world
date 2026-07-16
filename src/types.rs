use std::collections::HashMap;

use crate::game::BlockType;
use crate::consts::*;
use crate::terrain::Chunk;

/// グリーディメッシュ用
pub type Mask = [[Option<(BlockType, [f32; 4])>; CHUNK_SIZE]; CHUNK_SIZE];
/// チャンク内ブロックの配列
pub type ChunkBlocks = [BlockType; NUM_CHUNK_BLOCKS];
/// チャンク座標
pub type ChunkPos = (i32, i32, i32);
/// キャッシュ済みチャンク
pub type Chunks = HashMap<ChunkPos, Chunk>;
