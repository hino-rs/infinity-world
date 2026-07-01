use crate::consts::*;
use wgpu::util::DeviceExt;
use glam::{Mat4, Vec3};

pub struct Camera {
    pub eye: Vec3,
    pub yaw: f32,   // 水平アングル
    pub pitch: f32, // 垂直アングル
    pub aspect: f32,
    pub fovy: f32,
    pub znear: f32,
    pub zfar: f32,
}

pub struct CameraGpu {
    pub uniform: CameraUniform,
    pub buffer: wgpu::Buffer,  
    pub bind_group: wgpu::BindGroup, 
}

impl CameraGpu {
    pub fn new(device: &wgpu::Device, layout: &wgpu::BindGroupLayout, camera: &Camera) -> Self {
        let mut uniform = CameraUniform::new();
        uniform.update_view_proj(&camera);
        let buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Camera Buffer"),
            contents: bytemuck::cast_slice(&[uniform]),
            usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
        });
        let bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
            layout: &layout,
            entries: &[wgpu::BindGroupEntry {
                binding: 0,
                resource: buffer.as_entire_binding(),
            }],
            label: Some("camera bind group"),
        });

        Self {
            uniform,
            buffer,
            bind_group,
        }
    }

    pub fn update(&mut self, queue: &wgpu::Queue, camera: &Camera) {
        self.uniform.update_view_proj(camera);
        queue.write_buffer(
            &self.buffer,
            0, 
            bytemuck::cast_slice(&[self.uniform]),
        );
    }
}

#[repr(C)]
#[derive(Debug, Clone, Copy, bytemuck::Pod, bytemuck::Zeroable)]
pub struct CameraUniform {
    pub view_proj: [[f32; 4]; 4],
    pub inv_view_proj: [[f32; 4]; 4],
    pub eye_position: [f32; 4],
}

#[derive(Default)]
pub struct CameraController {
    pub speed: f32,
    pub sensitivity: f32,
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

impl Camera {
    pub fn new(
        eye: Vec3,
        yaw: f32,
        pitch: f32,
        aspect: f32,
        fovy: f32,
        znear: f32,
        zfar: f32,
    ) -> Self {
        Self {
            eye,
            yaw,
            pitch,
            aspect,
            fovy,
            znear,
            zfar,
        }
    }

    pub fn xyz(&self) -> (f32, f32, f32) {
        let eye = self.eye;
        (eye.x, eye.y, eye.z)
    }

    // ヨーとピッチからカメラんの前方ベクトルを計算する
    pub fn calc_forward(&self) -> Vec3 {
        let (sin_pitch, cos_pitch) = self.pitch.sin_cos();
        let (sin_yaw, cos_yaw) = self.yaw.sin_cos();

        Vec3::new(
            cos_pitch * sin_yaw, // 上下に向くほど左右成分を弱める
            sin_pitch,
            -cos_pitch * cos_yaw,
        )
        .normalize()
    }

    pub fn build_view_projection_matrix(&self) -> Mat4 {
        let forward = self.calc_forward();
        // カメラの向きを行列にする (位置, 注視点, 上下方向ヒント)
        // 世界座標系のすべての点を「カメラから見たらどこにあるか」に変換するため
        let view = Mat4::look_at_rh(self.eye, self.eye + forward, Vec3::Y);
        // 遠近感を行列にする
        let proj = Mat4::perspective_rh(self.fovy, self.aspect, self.znear, self.zfar);
        // まとめる
        proj * view
    }
}

impl CameraUniform {
    pub fn new() -> Self {
        Self {
            view_proj: Mat4::IDENTITY.to_cols_array_2d(),
            inv_view_proj: Mat4::IDENTITY.to_cols_array_2d(),
            eye_position: [0.0; 4],
        }
    }

    pub fn update_view_proj(&mut self, camera: &Camera) {
        let view_proj = camera.build_view_projection_matrix();
        self.view_proj = view_proj.to_cols_array_2d();
        // 逆行列
        self.inv_view_proj = view_proj.inverse().to_cols_array_2d();
        // カメラの位置を4次元配列へ拡張
        self.eye_position = [camera.eye.x, camera.eye.y, camera.eye.z, 1.0];
    }
}

impl CameraController {
    pub fn new(speed: f32, sensitivity: f32) -> Self {
        Self {
            speed,
            sensitivity,
            ..Default::default()
        }
    }

    // 入力と重力から、このフレームの移動量を計算して返す。
    pub fn compute_move(&mut self, camera: &mut Camera, dt: f32) -> Vec3 {
        if self.teleport {
            camera.eye.x = 0.0;
            camera.eye.z = 0.0;
            camera.eye.y = 300.0;
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

    // マウスの移動量からカメラの向き角を更新し、ピッチ角が真上・真下を向かないよう（±89度）制限する
    pub fn process_mouse(&mut self, mouse_dx: f64, mouse_dy: f64, camera: &mut Camera) {
        // マウスの移動量をカメラに反映する
        camera.yaw += (mouse_dx as f32) * self.sensitivity;
        camera.pitch -= (mouse_dy as f32) * self.sensitivity;

        let limit = 89.0f32.to_radians();
        if camera.pitch < -limit {
            camera.pitch = -limit;
        } else if camera.pitch > limit {
            camera.pitch = limit;
        }
    }
}
