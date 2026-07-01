use glam::Vec3;
use web_time::Instant;

use crate::camera::{Camera, CameraController};
use crate::consts::PLAYER_WALK_SPEED;
use crate::player::Player;
use crate::terrain::Terrain;

pub struct World {
    pub player: Player,
    pub camera: Camera,
    pub camera_controller: CameraController,
    pub terrain: Terrain,
    pub time: Instant,
    pub speed: f32,
    pub seed: u32,
    // pub buffer: wgpu::Buffer,
}

impl World {
    pub fn new(device: &wgpu::Device, aspect: f32) -> World {
        let initial_position = Vec3::new(0.0, 300.0, 0.0);
        
        let player = Player::new(initial_position);
        
        let camera = Camera::new(
            Vec3::new(5.0, 100.0, 5.0),
            0.0f32.to_radians(),
            -20.0f32.to_radians(),
            aspect,
            90.0f32.to_radians(),
            0.1,
            1000000000.0,
        );

        let terrain = Terrain::new(device);

        let camera_controller = CameraController::new(PLAYER_WALK_SPEED, 0.003);

        Self {
            player,
            camera,
            camera_controller,
            terrain,
            time: Instant::now(),
            speed: 1.0,
            seed: rand::random::<u32>(),
        }
    }

    pub fn update(&mut self, dt: f32) {
        // このフレームの希望移動量を計算 コントローラーは前フレームのon_groundを参照する
        let delta = self.camera_controller.compute_move(&mut self.camera, dt);

        // 軸分離で実際に動かす
        // let on_ground = self.player.move_player(delta);

        // 接地状態をコントローラーに書き戻す
        // self.camera_controller.on_ground = on_ground;
    }
}
