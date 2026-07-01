use glam::Vec3;
use web_time::Instant;

use crate::camera::Camera;
use crate::consts::PLAYER_WALK_SPEED;
use crate::player::{Player, PlayerController};
use crate::terrain::Terrain;

pub struct World {
    pub player: Player,
    pub player_controller: PlayerController,
    pub camera: Camera,
    pub terrain: Terrain,
    pub time: Instant,
    pub speed: f32,
    pub seed: u32,
    // pub buffer: wgpu::Buffer,
}

impl World {
    pub fn new(device: &wgpu::Device, aspect: f32) -> World {
        let initial_position = Vec3::new(0.0, 100.0, 0.0);
        
        let player = Player::new(initial_position);
        let player_controller = PlayerController::default();

        let camera = Camera::new(
            Vec3::new(5.0, 100.0, 5.0),
            0.0f32.to_radians(),
            -20.0f32.to_radians(),
            aspect,
            90.0f32.to_radians(),
            0.1,
            1000000000.0,
        );

        let seed = rand::random::<u32>();
        let terrain = Terrain::new(device, seed);

        Self {
            player,
            player_controller,
            camera,
            terrain,
            time: Instant::now(),
            speed: 1.0,
            seed,
        }
    }

    pub fn update(&mut self, dt: f32) {
        // このフレームの希望移動量を計算 コントローラーは前フレームのon_groundを参照する
        let delta = self.player_controller.compute_move(&mut self.player, &mut self.camera, dt);
        
        // 軸分離で実際に動かす
        let on_ground = self.player.move_player(delta, &self.terrain);
        
        // 接地状態をコントローラーに書き戻す
        self.player_controller.on_ground = on_ground;
        
        // カメラをプレイヤーへ
        self.camera.pursue_target(self.player.position);
    }
}
