/// チャンクの一辺のサイズ
pub const CHUNK_SIZE: usize = 32;
/// チャンクサイズ(i32)
pub const CHUNK_SIZE_I32: i32 = CHUNK_SIZE as i32;
/// チャンクサイズ(f32)
pub const CHUNK_SIZE_F32: f32 = CHUNK_SIZE as f32;
/// チャンクの体積(ブロック数)
pub const NUM_CHUNK_BLOCKS: usize = CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE;
/// 追加するチャンクの最大保留数
pub const CHANK_GEN_MAX_PENDING: usize = 128;
/// コンピュートのバッチサイズ
pub const BATCH_SIZE: usize = 16;
/// プレイヤーの素の歩行速度
pub const PLAYER_WALK_SPEED: f32 = 6.0;
/// 描画距離(横)
pub const RADIUS: i32 = 128;
/// 描画距離(縦)
pub const Y_RADIUS: i32 = 8;
/// プレイヤーの横幅の半分
pub const PLAYER_HALF_WIDTH: f32 = 0.3;
/// 身長(足元から目まで)
pub const PLAYER_HEIGHT: f32 = 1.8;
/// 視野角
pub const FOV: f32 = 110.0;
/// 描画対象の最短距離
pub const Z_NEAR: f32 = 0.1;
