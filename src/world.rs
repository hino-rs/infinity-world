use glam::Vec3;
use wgpu::Queue;

use crate::camera::Camera;
use crate::compute::Compute;
use crate::consts::{FOV, Z_NEAR};
use crate::player::{Player, PlayerController};
use crate::terrain::Terrain;


/// ワールド
pub struct World {
    pub player: Player,
    pub player_controller: PlayerController,
    pub camera: Camera,
    pub terrain: Terrain,
    pub seed: u32,
    pub ticks: u16,
    
}

impl World {
    /// ワールドを初期化します
    ///
    /// 1. アスペクト比: カメラ生成に必要です
    /// 2. 感度: 同上
    pub fn new(aspect: f32, sensitivity: f32, device: &wgpu::Device) -> World {
        let seed = getrandom::u32().unwrap();
        let initial_position = Vec3::new(0.0, 100.0, 0.0);

        let camera = Camera::new(
            initial_position,
            0.0f32.to_radians(),
            -20.0f32.to_radians(),
            aspect,
            FOV.to_radians(),
            Z_NEAR,
            sensitivity,
            false,
        );

        let terrain = Terrain::new();
        let player = Player::new(initial_position, device);
        let player_controller = PlayerController::default();

        Self {
            player,
            player_controller,
            camera,
            terrain,
            seed,
            ticks: 0,
        }
    }

    /// ワールド状態を進めます。
    /// 
    /// 1. 経過時間の差分
    /// 2. &wgpu::Device
    /// 3. &Compute
    /// 4. &Queue
    pub fn update(
        &mut self,
        dt: f32,
        device: &wgpu::Device,
        compute: &Compute,
        queue: &Queue,
    ) {
        // カメラをプレイヤー位置へ
        self.camera.pursue_target(self.player.position);
        
        // このフレームの速度を更新 コントローラーは前フレームのon_groundを参照する
        self.player_controller
            .update_velocity(&mut self.player, &self.camera, dt);

        // 軸分離で実際に動かす
        let on_ground = self.player.move_player(dt, &self.terrain);

        // 接地状態をコントローラーに書き戻す
        self.player_controller.on_ground = on_ground;

        // 視錐台生成とカリングのために現在地とカメラビュープロジェクション
        let player_pos = self.player.position.as_ivec3();
        let vp = self.camera.build_view_projection_matrix(1.0);
        
        // チャンク生成
        self.terrain.add_chunks(
            device,
            self.seed,
            player_pos,
            compute,
            queue,
            &vp,
        );

        // 3tickに一度掃除を走らせる
        if self.ticks % 3 == 0 {
            // チャンク掃除
            self.terrain.clear_chunks(player_pos, &vp);
        }

        self.ticks = self.ticks.wrapping_add_signed(1);
    }
}
