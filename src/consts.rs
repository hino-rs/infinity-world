// --- チャンク関係 ---
pub const CHUNK_SIZE: usize = 32;
pub const MAX_HEIGHT: usize = 16;
pub const NUM_CHUNK_BLOCKS: usize = CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE;
pub const X_STRIDE: usize = CHUNK_SIZE;
pub const Y_STRIDE: usize = CHUNK_SIZE * CHUNK_SIZE;
pub const Z_STRIDE: usize = 1;
pub const CHUNK_VOLUME: usize = X_STRIDE*Y_STRIDE;
pub const SEA_LEVEL: usize = 10; // 平均的な地表
pub const DIRT_DEPTH: i32 = 4;
// pub const MAX_MOUNTAIN_HEIGHT: f64 = MAX_HEIGHT as f64;

// --- プレイヤー関係 ---
pub const PLAYER_WALK_SPEED: f32 = 6.0;
pub const RADIUS: i32 = 2; // // プレイヤーを中心としたチャンク生成対象の半径
pub const PLAYER_HALF_WIDTH: f32 = 0.3; // 横幅の半分（全幅 0.6）
pub const PLAYER_HEIGHT: f32 = 1.8; // 身長（足元から目まで）
pub const FOV: f32 = 90.0;
pub const Z_FAR: f32 = 10000000.0;
pub const Z_NEAR: f32 = 0.1;

