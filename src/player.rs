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

    pub fn move_player(&mut self, delta: Vec3) -> bool {
        todo!()
    }
}