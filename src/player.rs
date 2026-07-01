use glam::*;
use crate::{camera::Camera, consts::*, terrain::Terrain};

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
        let x1 = aabb.first.x;
        let x2 = aabb.end.x;
        let y1 = aabb.first.y;
        let y2 = aabb.end.y;
        let z1 = aabb.first.z;
        let z2 = aabb.end.z;

        AabbFull {
            min_x: x1.min(x2),
            max_x: x1.max(x2),
            min_y: y1.min(y2),
            max_y: y1.max(y2),
            min_z: z1.min(z2),
            max_z: z1.max(z2),
        }
    }

    pub fn new(pos: Vec3) -> Self {
        let x1 = pos.x - PLAYER_HALF_WIDTH;
        let x2 = pos.x + PLAYER_HALF_WIDTH;
        let y1 = pos.y - PLAYER_HEIGHT;
        let y2 = pos.y;
        let z1 = pos.z - PLAYER_HALF_WIDTH;
        let z2 = pos.z + PLAYER_HALF_WIDTH;


        let min_x = x1.min(x2);
        let max_x = x1.max(x2);
        let min_y = y1.min(y2);
        let max_y = y1.max(y2);
        let min_z = z1.min(z2);
        let max_z = z1.max(z2);

        Aabb::compress(AabbFull {
            min_x, max_x,
            min_y, max_y,
            min_z, max_z,
        })
    }
}


pub struct Player {
    pub position: Vec3,
    velocity_y: f32,
}

#[derive(Default)]
pub struct PlayerController {
    pub speed: f32,
    pub velocity_y: f32,
    pub is_forward_pressed: bool,
    pub is_backward_pressed: bool,
    pub is_left_pressed: bool,
    pub is_right_pressed: bool,
    pub is_up_pressed: bool,
    pub is_down_pressed: bool,
    pub is_dash_pressed: bool,
    pub on_ground: bool,
    pub teleport: bool,
    pub floating: bool,
}


impl Player {
    pub fn new(position: Vec3) -> Self {
        Self {
            position,
            velocity_y: 0.0,
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

    pub fn move_player(&mut self, delta: Vec3, terrain: &Terrain) -> bool {
        let mut on_ground = false;
        // --- X軸（壁判定・横） ---
        let mut try_pos = self.position;
        try_pos.x += delta.x;
        if terrain.collides_at(Aabb::new(try_pos)) {
            // 壁にぶつかった
        } else {
            self.position.x = try_pos.x;
        }
        
        // --- Z軸（壁判定・奥行き） ---
        let mut try_pos = self.position;
        try_pos.z += delta.z;
        if terrain.collides_at(Aabb::new(try_pos)) {
            // Z の移動を捨てる
        } else {
            self.position.z = try_pos.z;
        }
        
        // --- Y軸（地面・天井） ---
        let mut try_pos = self.position;
        try_pos.y += delta.y;
        if terrain.collides_at(Aabb::new(try_pos)) {
            // 縦にぶつかった
            if delta.y < 0.0 {
                on_ground = true; // 下向きで衝突 → 着地
            }
            // 上向きで衝突なら頭をぶつけた。いずれも縦速度を0へ
            self.velocity_y = 0.0;
        } else {
            self.position.y = try_pos.y;
        }

        on_ground
    }
}

impl PlayerController {
    // 入力と重力から、このフレームの移動量を計算して返す。
    pub fn compute_move(&mut self, player: &mut Player, camera: &Camera, dt: f32) -> Vec3 {
        if self.teleport {
            player.position.x = 0.0;
            player.position.z = 0.0;
            player.position.y = 300.0;
            return Vec3::ZERO;
        }

        // 地面に水平な前方・右方向（XZ平面）
        let (sin_yaw, cos_yaw) = camera.yaw.sin_cos();
        let forward_ground = Vec3::new(sin_yaw, 0.0, -cos_yaw).normalize();
        let right_ground = Vec3::new(cos_yaw, 0.0, sin_yaw).normalize();

        self.speed = if self.is_dash_pressed {
            PLAYER_WALK_SPEED * 5.0
        } else {
            PLAYER_WALK_SPEED
        };

        let mut move_dir = Vec3::ZERO;
        if self.is_forward_pressed {
            move_dir += forward_ground;
        }
        if self.is_backward_pressed {
            move_dir -= forward_ground;
        }
        if self.is_right_pressed {
            move_dir += right_ground;
        }
        if self.is_left_pressed {
            move_dir -= right_ground;
        }

        // 水平移動量（斜めも同じ速さになるよう正規化）
        let horizontal = if move_dir != Vec3::ZERO {
            move_dir.normalize() * self.speed * dt
        } else {
            Vec3::ZERO
        };

        // --- 縦方向 ---
        // 浮遊なら接地関係なしに上下させるだけ
        if self.floating {
            self.velocity_y = 0.0;
            if self.is_up_pressed {
                self.velocity_y = 7.5;
            }
            if self.is_down_pressed {
                self.velocity_y = -7.5;
            }
        } else {
            // 接地中はジャンプ受付、空中は重力
            if self.on_ground {
                if self.is_up_pressed {
                    self.velocity_y = 7.5; // ジャンプ初速
                }
            } else {
                let gravity = 18.0;
                self.velocity_y -= gravity * dt;
            }
        }
        let vertical = self.velocity_y * dt;

        Vec3::new(horizontal.x, vertical, horizontal.z)
    }

    pub fn process_keyboard(
        &mut self,
        key: winit::keyboard::KeyCode,
        pressed: bool,
        repeat: bool,
    ) -> bool {
        match key {
            winit::keyboard::KeyCode::KeyW | winit::keyboard::KeyCode::ArrowUp => {
                self.is_forward_pressed = pressed;
                true
            }
            winit::keyboard::KeyCode::KeyS | winit::keyboard::KeyCode::ArrowDown => {
                self.is_backward_pressed = pressed;
                true
            }
            winit::keyboard::KeyCode::KeyA | winit::keyboard::KeyCode::ArrowLeft => {
                self.is_left_pressed = pressed;
                true
            }
            winit::keyboard::KeyCode::KeyD | winit::keyboard::KeyCode::ArrowRight => {
                self.is_right_pressed = pressed;
                true
            }
            winit::keyboard::KeyCode::Space => {
                self.is_up_pressed = pressed;
                true
            }
            winit::keyboard::KeyCode::ShiftLeft | winit::keyboard::KeyCode::ShiftRight => {
                self.is_dash_pressed = pressed;
                true
            }
            winit::keyboard::KeyCode::ControlLeft | winit::keyboard::KeyCode::ControlRight => {
                self.is_down_pressed = pressed;
                true
            }
            winit::keyboard::KeyCode::KeyT => {
                self.teleport = pressed;
                true
            }
            winit::keyboard::KeyCode::KeyF if !repeat && pressed => {
                self.floating = !self.floating;
                true
            }
            _ => false,
        }
    }
}