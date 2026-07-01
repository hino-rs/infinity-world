use glam::{Vec3, Vec3Swizzles};
use web_time::Instant;

use crate::camera::Camera;
use crate::consts::RADIUS;
use crate::game::BlockType::Air;
use crate::player::{Player, PlayerController};
use crate::terrain::Terrain;

pub struct World {
    pub player: Player,
    pub player_controller: PlayerController,
    pub camera: Camera,
    pub terrain: Terrain,
    pub time: u128,
    pub angle: f32,
    pub speed: f32,
    pub seed: u32,
}

impl World {
    pub fn new(
        device: &wgpu::Device, 
        aspect: f32,
        storage_layout: &wgpu::BindGroupLayout,
    ) -> World {
        let seed = rand::random::<u32>();
        let initial_position = Vec3::new(0.0, 100.0, 0.0);
        let terrain = Terrain::new(device, seed, initial_position, storage_layout);
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

        Self {
            player,
            player_controller,
            camera,
            terrain,
            time: 0,
            angle: 0.0,
            speed: 1.0,
            seed,
        }
    }

    pub fn update(&mut self, dt: f32, device: &wgpu::Device, storage_layout: &wgpu::BindGroupLayout) {
        // このフレームの希望移動量を計算 コントローラーは前フレームのon_groundを参照する
        let delta = self.player_controller.compute_move(&mut self.player, &mut self.camera, dt);
        
        // 軸分離で実際に動かす
        let on_ground = self.player.move_player(delta, &self.terrain);
        
        // 接地状態をコントローラーに書き戻す
        self.player_controller.on_ground = on_ground;
        
        // カメラをプレイヤー位置へ
        self.camera.pursue_target(self.player.position);

        // チャンク生成と掃除
        self.terrain.add_chunks(device, self.seed, self.player.pos_xzi(), storage_layout);
        if self.terrain.chunks.len() > ((RADIUS*2+1)*(RADIUS*2+1)) as usize {
            self.terrain.clear_chunks(self.player.pos_xzi());
        }
    }
}
