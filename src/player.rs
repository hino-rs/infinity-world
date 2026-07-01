use glam::*;
use crate::consts::*;

/// firstが左下手前、endが右上奥
pub struct Aabb {
    pub first: Vec3,
    pub end: Vec3,
}

pub struct AabbFull {
    pub min_x: f32,
    pub max_x: f32,
    pub min_y: f32,
    pub max_y: f32,
    pub min_z: f32,
    pub max_z: f32,
}

impl Aabb {
    pub fn compress(full: AabbFull) -> Aabb {
        Aabb {
            first: Vec3::new(full.min_x, full.max_y, full.max_z),
            end: Vec3::new(full.max_x, full.min_y, full.min_z)
        }
    }

    pub fn decompress(aabb: Aabb) -> AabbFull {
        AabbFull {
            min_x: aabb.first.x,
            max_x: aabb.end.x,
            min_y: aabb.first.y,
            max_y: aabb.end.y,
            min_z: aabb.first.z,
            max_z: aabb.end.z,
        }
    }
}


pub struct Player {
    position: Vec3,
}

impl Player {
    pub fn new(position: Vec3) -> Self {
        Self {
            position,
        }
    }

    pub fn aabb(&self) -> Aabb {
        let min_x = self.position.x - PLAYER_HALF_WIDTH;
        let max_x = self.position.x + PLAYER_HALF_WIDTH;
        
        let min_y = self.position.y - PLAYER_HEIGHT;
        let max_y = self.position.y;

        let min_z = self.position.z - PLAYER_HALF_WIDTH;
        let max_z = self.position.z + PLAYER_HALF_WIDTH;

        Aabb::compress(AabbFull {
            min_x, max_x,
            min_y, max_y,
            min_z, max_z,
        })
    }

    // pub fn move_player(&mut self, delta: Vec3) -> bool {
    //     let mut on_ground = false;

    //     // --- X軸（壁判定・横） ---
    //     let mut try_eye = self.camera.eye;
    //     try_eye.x += delta.x;
    //     if self.collides_at(try_eye) {
    //         // 壁にぶつかった → X の移動は捨てる（= 壁に沿って滑る）
    //     } else {
    //         self.camera.eye.x = try_eye.x;
    //     }

    //     // --- Z軸（壁判定・奥行き） ---
    //     let mut try_eye = self.camera.eye;
    //     try_eye.z += delta.z;
    //     if self.collides_at(try_eye) {
    //         // Z の移動を捨てる
    //     } else {
    //         self.camera.eye.z = try_eye.z;
    //     }

    //     // --- Y軸（地面・天井） ---
    //     let mut try_eye = self.camera.eye;
    //     try_eye.y += delta.y;
    //     if self.collides_at(try_eye) {
    //         // 縦にぶつかった
    //         if delta.y < 0.0 {
    //             on_ground = true; // 下向きで衝突 → 着地
    //         }
    //         // 上向きで衝突なら頭をぶつけた。いずれも縦速度を殺す
    //         self.camera_controller.velocity_y = 0.0;
    //     } else {
    //         self.camera.eye.y = try_eye.y;
    //     }

    //     on_ground
    // }
}