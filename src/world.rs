use crate::camera::Camera;
use crate::player::Player;
use crate::terrain::Terrain;

pub struct World {
    player: Player,
    camera: Camera,
    terrain: Terrain,
    time: f32,
    speed: f32,
}

impl World {
    pub fn new(player: Player, camera: Camera, terrain: Terrain) -> World {
        Self {
            player,
            camera,
            terrain,
            time: 0.0,
            speed: 1.0,
        }
    }
}
