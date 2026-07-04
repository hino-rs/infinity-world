use glam::Vec3;

use crate::camera::Camera;
use crate::consts::{FOV, RADIUS, Z_FAR, Z_NEAR};
use crate::player::{Player, PlayerController};
use crate::terrain::Terrain;

pub struct World {
    pub player: Player,
    pub player_controller: PlayerController,
    pub camera: Camera,
    pub terrain: Terrain,
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
            FOV.to_radians(),
            Z_NEAR,
            Z_FAR,
        );

        Self {
            player,
            player_controller,
            camera,
            terrain,
            seed,
        }
    }

    pub fn update(&mut self, dt: f32, device: &wgpu::Device, storage_layout: &wgpu::BindGroupLayout) {
        // このフレームの希望移動量を計算 コントローラーは前フレームのon_groundを参照する
        let delta = self.player_controller.compute_move(&mut self.player, &self.camera, dt);
        
        // 軸分離で実際に動かす
        let on_ground = self.player.move_player(delta, &self.terrain);
        
        // 接地状態をコントローラーに書き戻す
        self.player_controller.on_ground = on_ground;
        
        // カメラをプレイヤー位置へ
        self.camera.pursue_target(self.player.position);

        let player_pos = self.player.position.as_ivec3();
        // チャンク生成と掃除
        self.terrain.add_chunks(device, self.seed, player_pos, storage_layout);
        // チャンク境界動いたときにで生成・掃除の高速繰り返しが起きないように若干余裕を持たせる
        // if self.terrain.chunks.len() > ((RADIUS*2+3)*(RADIUS*2+3)*(RADIUS*2+3)) as usize {
        if self.terrain.chunks.len() > ((RADIUS*2+1)*(RADIUS*2+1)*(RADIUS*2+1)) as usize {
            self.terrain.clear_chunks(player_pos);
        }


        // println!("{:?}", self.terrain.block_at_world(player_pos.x, player_pos.y, player_pos.z));
    }
}
