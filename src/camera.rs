use std::f32::consts::TAU;

use wgpu::util::DeviceExt;
use glam::{Mat4, Vec3, Vec4};

pub struct Camera {
    pub eye: Vec3,
    pub yaw: f32,   // 水平アングル
    pub pitch: f32, // 垂直アングル
    pub aspect: f32,
    pub fovy: f32,
    pub znear: f32,
    pub zfar: f32,
    pub sensitivity: f32,
}

pub struct CameraGpu {
    pub uniform: CameraUniform,
    pub buffer: wgpu::Buffer,  
    pub bind_group: wgpu::BindGroup, 
}

impl CameraGpu {
    pub fn new(device: &wgpu::Device, layout: &wgpu::BindGroupLayout, camera: &Camera) -> Self {
        let mut uniform = CameraUniform::new();
        uniform.update_view_proj(camera);
        let buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Camera Buffer"),
            contents: bytemuck::cast_slice(&[uniform]),
            usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
        });
        let bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
            layout,
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
            sensitivity: 0.01,
        }
    }

    // マウスの移動量からカメラの向き角を更新し、ピッチ角が真上・真下を向かないよう（±89度）制限する
    pub fn process_mouse(&mut self, mouse_dx: f64, mouse_dy: f64) {
        // マウスの移動量をカメラに反映する
        self.yaw = (self.yaw + (mouse_dx as f32) * self.sensitivity).rem_euclid(TAU);
        self.pitch -= (mouse_dy as f32) * self.sensitivity;

        let limit = 89.0f32.to_radians();
        if self.pitch < -limit {
            self.pitch = -limit;
        } else if self.pitch > limit {
            self.pitch = limit;
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

    /// ターゲットに追従
    pub fn pursue_target(&mut self, target: Vec3) {
        self.eye = target;
    }

    /// ビュー・プロジェクション行列を作る
    pub fn get_view_proj_matrix(&self) -> Mat4 {
        let front = self.calc_forward();
        let pulled_eye = self.eye - front * 100.0;
        let view = Mat4::look_to_rh(pulled_eye, front, Vec3::Y);
        let proj = Mat4::perspective_rh_gl(self.fovy, self.aspect, 0.0, self.zfar);
        proj * view
    }

    /// 指定したワールド座標がカメラの視界内にあるかを判定する
    pub fn is_point_in_frustum(point_world: Vec3, vp: &Mat4) -> bool {
        let point_clip = *vp * point_world.extend(1.0);
        let w = point_clip.w;
        -w <= point_clip.x && point_clip.x <= w &&
        -w <= point_clip.y && point_clip.y <= w &&
        -w <= point_clip.z && point_clip.z <= w
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

