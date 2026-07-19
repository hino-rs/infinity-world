use crate::{
    camera::Camera,
    consts::*,
    terrain::Terrain,
    utils::{Aabb, AabbFull},
};
use glam::*;
use wgpu::util::DeviceExt;

pub struct Player {
    pub position: Vec3,
    pub velocity: Vec3,
    pub current_chunk_pos: IVec3,
    pub vertex_buffer: wgpu::Buffer,
    pub index_buffer: wgpu::Buffer,
    pub num_indices: u32,
}

#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable, Default)]
pub struct PlayerVertex {
    pub position: [f32; 3],
    pub color: [f32; 3],
    pub normal: [f32; 3],
}

impl PlayerVertex {
    /// wgpu レンダリングパイプラインでこの頂点データ構造をどのように解釈するかを示すレイアウトを返す
    pub fn desc() -> wgpu::VertexBufferLayout<'static> {
        use std::mem;
        const ATTRIBUTES: [wgpu::VertexAttribute; 3] = wgpu::vertex_attr_array![
            0 => Float32x3, // position
            1 => Float32x3, // color
            2 => Float32x3, // normal
        ];
        wgpu::VertexBufferLayout {
            array_stride: mem::size_of::<PlayerVertex>() as wgpu::BufferAddress,
            step_mode: wgpu::VertexStepMode::Vertex,
            attributes: &ATTRIBUTES,
        }
    }
}

pub const PLAYER_VERTICES: &[PlayerVertex] = &[
    // --- 前面 (Z = PLAYER_HALF_WIDTH) 法線: [0, 0, 1] ---
    PlayerVertex { position: [-PLAYER_HALF_WIDTH, -PLAYER_HEIGHT,  PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 0.0, 1.0] },  // 0
    PlayerVertex { position: [ PLAYER_HALF_WIDTH, -PLAYER_HEIGHT,  PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 0.0, 1.0] },  // 1
    PlayerVertex { position: [ PLAYER_HALF_WIDTH,  0.0,            PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 0.0, 1.0] },  // 2
    PlayerVertex { position: [-PLAYER_HALF_WIDTH,  0.0,            PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 0.0, 1.0] },  // 3

    // --- 後ろ面 (Z = -PLAYER_HALF_WIDTH) 法線: [0, 0, -1] ---
    PlayerVertex { position: [-PLAYER_HALF_WIDTH, -PLAYER_HEIGHT, -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 0.0, -1.0] }, // 4
    PlayerVertex { position: [ PLAYER_HALF_WIDTH, -PLAYER_HEIGHT, -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 0.0, -1.0] }, // 5
    PlayerVertex { position: [ PLAYER_HALF_WIDTH,  0.0,           -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 0.0, -1.0] }, // 6
    PlayerVertex { position: [-PLAYER_HALF_WIDTH,  0.0,           -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 0.0, -1.0] }, // 7

    // --- 左面 (X = -PLAYER_HALF_WIDTH) 法線: [-1, 0, 0] ---
    PlayerVertex { position: [-PLAYER_HALF_WIDTH, -PLAYER_HEIGHT, -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [-1.0, 0.0, 0.0] }, // 8
    PlayerVertex { position: [-PLAYER_HALF_WIDTH,  0.0,           -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [-1.0, 0.0, 0.0] }, // 9
    PlayerVertex { position: [-PLAYER_HALF_WIDTH,  0.0,            PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [-1.0, 0.0, 0.0] }, // 10
    PlayerVertex { position: [-PLAYER_HALF_WIDTH, -PLAYER_HEIGHT,  PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [-1.0, 0.0, 0.0] }, // 11

    // --- 右面 (X = PLAYER_HALF_WIDTH) 法線: [1, 0, 0] ---
    PlayerVertex { position: [ PLAYER_HALF_WIDTH, -PLAYER_HEIGHT, -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [1.0, 0.0, 0.0] },  // 12
    PlayerVertex { position: [ PLAYER_HALF_WIDTH, -PLAYER_HEIGHT,  PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [1.0, 0.0, 0.0] },  // 13
    PlayerVertex { position: [ PLAYER_HALF_WIDTH,  0.0,            PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [1.0, 0.0, 0.0] },  // 14
    PlayerVertex { position: [ PLAYER_HALF_WIDTH,  0.0,           -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [1.0, 0.0, 0.0] },  // 15

    // --- 上面 (Y = 0.0) 法線: [0, 1, 0] ---
    PlayerVertex { position: [-PLAYER_HALF_WIDTH,  0.0,           -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 1.0, 0.0] },  // 16
    PlayerVertex { position: [ PLAYER_HALF_WIDTH,  0.0,           -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 1.0, 0.0] },  // 17
    PlayerVertex { position: [ PLAYER_HALF_WIDTH,  0.0,            PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 1.0, 0.0] },  // 18
    PlayerVertex { position: [-PLAYER_HALF_WIDTH,  0.0,            PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, 1.0, 0.0] },  // 19

    // --- 下面 (Y = -PLAYER_HEIGHT) 法線: [0, -1, 0] ---
    PlayerVertex { position: [-PLAYER_HALF_WIDTH, -PLAYER_HEIGHT, -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, -1.0, 0.0] }, // 20
    PlayerVertex { position: [ PLAYER_HALF_WIDTH, -PLAYER_HEIGHT, -PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, -1.0, 0.0] }, // 21
    PlayerVertex { position: [ PLAYER_HALF_WIDTH, -PLAYER_HEIGHT,  PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, -1.0, 0.0] }, // 22
    PlayerVertex { position: [-PLAYER_HALF_WIDTH, -PLAYER_HEIGHT,  PLAYER_HALF_WIDTH], color: [1.0; 3], normal: [0.0, -1.0, 0.0] }, // 23
];

pub const PLAYER_INDICES: &[u32] = &[
    0,1,2,      0,2,3,        // 前面 (+Z)
    4,7,6,      4,6,5,        // 後ろ面 (-Z)
    8,11,10,    8,10,9,       // 左面 (-X)
    12,15,14,   12,14,13,     // 右面 (+X)
    16,19,18,   16,18,17,     // 上面 (+Y)
    20,21,22,   20,22,23,     // 下面 (-Y)
];

#[derive(Default)]
pub struct PlayerController {
    pub speed: f32,
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
    pub fn new(position: Vec3, device: &wgpu::Device) -> Self {
        let cx = position.x.div_euclid(CHUNK_SIZE_F32) as i32;
        let cy = position.y.div_euclid(CHUNK_SIZE_F32) as i32;
        let cz = position.z.div_euclid(CHUNK_SIZE_F32) as i32;

        let vertex_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Player Vertex Buffer"),
            contents: bytemuck::cast_slice(PLAYER_VERTICES),
            usage: wgpu::BufferUsages::VERTEX,
        });

        let index_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Player Index Buffer"),
            contents: bytemuck::cast_slice(PLAYER_INDICES),
            usage: wgpu::BufferUsages::INDEX,
        });

        Self {
            position,
            velocity: Vec3::ZERO,
            current_chunk_pos: IVec3::new(cx, cy, cz),
            vertex_buffer,
            index_buffer,
            num_indices: PLAYER_INDICES.len() as u32,
        }
    }

    pub fn current_chunk_pos(&self) -> IVec3 {
        let cx = self.position.x.div_euclid(CHUNK_SIZE_F32) as i32;
        let cy = self.position.y.div_euclid(CHUNK_SIZE_F32) as i32;
        let cz = self.position.z.div_euclid(CHUNK_SIZE_F32) as i32;

        IVec3::new(cx, cy, cz)
    }

    pub fn get_aabb(&self) -> Aabb {
        let min_x = self.position.x - PLAYER_HALF_WIDTH;
        let max_x = self.position.x + PLAYER_HALF_WIDTH;

        let min_y = self.position.y - PLAYER_HEIGHT;
        let max_y = self.position.y;

        let min_z = self.position.z - PLAYER_HALF_WIDTH;
        let max_z = self.position.z + PLAYER_HALF_WIDTH;

        Aabb {
            first: Vec3::new(min_x, max_y, max_z),
            end: Vec3::new(max_x, min_y, min_z),
        }
    }

    pub fn get_aabb_full(&self) -> AabbFull {
        let aabb = self.get_aabb();
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

    pub fn move_player(&mut self, dt: f32, terrain: &Terrain) -> bool {
        let mut on_ground = false;
        let delta = self.velocity * dt;

        // --- X軸（壁判定・横） ---
        let tmp = self.position.x;
        self.position.x += delta.x;
        if terrain.collides_at(&self.get_aabb_full()) {
            self.position.x = tmp;
            self.velocity.x = 0.0;
        }

        // --- Z軸（壁判定・奥行き） ---
        let tmp = self.position.z;
        self.position.z += delta.z;
        if terrain.collides_at(&self.get_aabb_full()) {
            self.position.z = tmp;
            self.velocity.z = 0.0;
        }

        // --- Y軸（地面・天井） ---
        let tmp = self.position.y;
        self.position.y += delta.y;
        if terrain.collides_at(&self.get_aabb_full()) {
            self.position.y = tmp;
            // 縦にぶつかった
            if delta.y < 0.0 {
                on_ground = true; // 下向きで衝突 → 着地
            }
            // 上向きで衝突なら頭をぶつけた。いずれも縦速度を0へ
            self.velocity.y = 0.0;
        }

        on_ground
    }
}

impl PlayerController {
    // 入力と重力から、このフレームの速度を更新する。
    pub fn update_velocity(&mut self, player: &mut Player, camera: &Camera, dt: f32) {
        // Tボタンが押されていたら上空へ 
        if self.teleport {
            player.position.y = 500.0;
            player.velocity = Vec3::ZERO;
            return;
        }

        // 地面に水平な前方・右方向
        let (sin_yaw, cos_yaw) = camera.yaw.sin_cos();
        let forward_ground = Vec3::new(sin_yaw, 0.0, -cos_yaw).normalize_or_zero();
        let right_ground = Vec3::new(cos_yaw, 0.0, sin_yaw).normalize_or_zero();

        // ダッシュボタン(長押しで加速していく)
        self.speed = if self.is_dash_pressed {
            (self.speed * 1.05).min(250.0)
        } else {
            PLAYER_WALK_SPEED
        };

        // WASD・↑←↓→
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

        let input_dir = move_dir.normalize_or_zero();

        // --- 速度計算 ---
        if self.floating {
            // 浮遊なら接地関係なしに上下させるだけ
            let mut fly_vel_y = 0.0;
            if self.is_up_pressed {
                fly_vel_y = if self.is_dash_pressed && !self.on_ground {
                    (7.5 * self.speed).min(30.0)
                } else {
                    7.5
                };
            }
            if self.is_down_pressed {
                fly_vel_y = if self.is_dash_pressed {
                    (-7.5 * self.speed).max(-30.0)
                } else {
                    -7.5
                };
            }

            let target_vel = input_dir * self.speed + Vec3::Y * fly_vel_y;
            let decay = 8.0;
            let factor = 1.0 - (-decay * dt).exp();
            player.velocity = player.velocity.lerp(target_vel, factor);
        } else {
            // 通常移動時の水平速度の加減速
            let current_h = Vec3::new(player.velocity.x, 0.0, player.velocity.z);
            let target_h = input_dir * self.speed;

            let decay = if self.on_ground {
                if input_dir != Vec3::ZERO {
                    12.0 // 地上加速
                } else {
                    30.0 // 地上摩擦
                }
            } else {
                if input_dir != Vec3::ZERO {
                    2.5 // 空中加速
                } else {
                    1.0 // 空中摩擦
                }
            };
            let factor = 1.0 - (-decay * dt).exp();
            let new_h = current_h.lerp(target_h, factor);
            player.velocity.x = new_h.x;
            player.velocity.z = new_h.z;

            // 接地中はジャンプ受付、空中は重力
            if self.on_ground {
                if self.is_up_pressed {
                    player.velocity.y = 6.0; // ジャンプ初速
                } else {
                    player.velocity.y = 0.0;
                }
            } else {
                let gravity = 18.0;
                player.velocity.y -= gravity * dt;
            }
        }
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
