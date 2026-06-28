#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[repr(u8)]
pub enum BlockType {
    Air = 0,
    Stone = 1,
    Dirt = 2,
    Grass = 3,
}

#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable)]
pub struct TerrainVertex {
    pub position: [f32; 3],
    pub tex_coords: [f32; 2],
    pub block_type: u32,
}

impl TerrainVertex {
    pub fn desc() -> wgpu::VertexBufferLayout<'static> {
        use std::mem;
        wgpu::VertexBufferLayout {
            array_stride: mem::size_of::<TerrainVertex>() as wgpu::BufferAddress,
            step_mode: wgpu::VertexStepMode::Vertex,
            attributes: &[
                wgpu::VertexAttribute {
                    offset: 0,
                    shader_location: 0,
                    format: wgpu::VertexFormat::Float32x3,
                },
                wgpu::VertexAttribute {
                    offset: 12,
                    shader_location: 1,
                    format: wgpu::VertexFormat::Float32x2,
                },
                wgpu::VertexAttribute {
                    offset: 20,
                    shader_location: 2,
                    format: wgpu::VertexFormat::Uint32,
                },
            ],
        }
    }
}

#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable)]
pub struct Vertex {
    /// 3次元空間における位置座標 [x, y, z]
    pub position: [f32; 3],
    pub tex_coords: [f32; 2],
}

impl Vertex {
    /// wgpu レンダリングパイプラインでこの頂点データ構造をどのように解釈するかを示すレイアウトを返す。
    pub fn desc() -> wgpu::VertexBufferLayout<'static> {
        use std::mem;
        wgpu::VertexBufferLayout {
            // 頂点1つ分のバイトサイズ（ストライド）を指定
            array_stride: mem::size_of::<Vertex>() as wgpu::BufferAddress,
            // 描画ごとに頂点データをどのように進めるか（頂点ごとに進める）
            step_mode: wgpu::VertexStepMode::Vertex,
            // 頂点の属性（フィールド）のレイアウト情報
            attributes: &[
                // location(0): position フィールド (Float32x3 = 12バイト)
                wgpu::VertexAttribute {
                    offset: 0,          // 構造体の先頭から配置
                    shader_location: 0, // shader.wgsl 内の @location(0) に対応
                    format: wgpu::VertexFormat::Float32x3,
                },
                // location(1): UV座標 (Float32x2 = 8バイト)
                wgpu::VertexAttribute {
                    offset: 12,
                    shader_location: 1, // shader.wgsl 内の @location(1)
                    format: wgpu::VertexFormat::Float32x2,
                },
            ],
        }
    }
}


pub fn calc_ao(side1: bool, side2: bool, corner: bool) -> u8 {
    if side1 && side2 {
        return 0;
    }
    3 - (side1 as u8 + side2 as u8 + corner as u8)
}

pub fn create_virtices() -> &'static [Vertex] {
    &[
        // 後ろ面 (Z = -0.5)
        Vertex { position: [-0.5, -0.5, -0.5], tex_coords: [0.0, 1.0] }, // 0
        Vertex { position: [ 0.5, -0.5, -0.5], tex_coords: [1.0, 1.0] }, // 1
        Vertex { position: [ 0.5,  0.5, -0.5], tex_coords: [1.0, 0.0] }, // 2
        Vertex { position: [-0.5,  0.5, -0.5], tex_coords: [0.0, 0.0] }, // 3
        // 前面 (Z = 0.5)
        Vertex { position: [-0.5, -0.5,  0.5], tex_coords: [0.0, 1.0] }, // 4
        Vertex { position: [ 0.5, -0.5,  0.5], tex_coords: [1.0, 1.0] }, // 5
        Vertex { position: [ 0.5,  0.5,  0.5], tex_coords: [1.0, 0.0] }, // 6
        Vertex { position: [-0.5,  0.5,  0.5], tex_coords: [0.0, 0.0] }, // 7
        // 下面 (Y = -0.5)
        Vertex { position: [-0.5, -0.5, -0.5], tex_coords: [0.0, 0.0] }, // 8
        Vertex { position: [ 0.5, -0.5, -0.5], tex_coords: [1.0, 0.0] }, // 9
        Vertex { position: [ 0.5, -0.5,  0.5], tex_coords: [1.0, 1.0] }, // 10
        Vertex { position: [-0.5, -0.5,  0.5], tex_coords: [0.0, 1.0] }, // 11
        // 上面 (Y = 0.5)
        Vertex { position: [-0.5,  0.5, -0.5], tex_coords: [0.0, 1.0] }, // 12
        Vertex { position: [ 0.5,  0.5, -0.5], tex_coords: [1.0, 1.0] }, // 13
        Vertex { position: [ 0.5,  0.5,  0.5], tex_coords: [1.0, 0.0] }, // 14
        Vertex { position: [-0.5,  0.5,  0.5], tex_coords: [0.0, 0.0] }, // 15
        // 左面 (X = -0.5)
        Vertex { position: [-0.5, -0.5, -0.5], tex_coords: [0.0, 1.0] }, // 16
        Vertex { position: [-0.5,  0.5, -0.5], tex_coords: [0.0, 0.0] }, // 17
        Vertex { position: [-0.5,  0.5,  0.5], tex_coords: [1.0, 0.0] }, // 18
        Vertex { position: [-0.5, -0.5,  0.5], tex_coords: [1.0, 1.0] }, // 19
        // 右面 (X = 0.5)
        Vertex { position: [ 0.5, -0.5, -0.5], tex_coords: [1.0, 1.0] }, // 20
        Vertex { position: [ 0.5, -0.5,  0.5], tex_coords: [0.0, 1.0] }, // 21
        Vertex { position: [ 0.5,  0.5,  0.5], tex_coords: [0.0, 0.0] }, // 22
        Vertex { position: [ 0.5,  0.5, -0.5], tex_coords: [1.0, 0.0] }, // 23
    ]    
}

pub const INDICES: &[u16] = &[
    0, 1, 2, 0, 2, 3,       // 後ろ面
    4, 6, 5, 4, 7, 6,       // 前面
    8, 11, 10, 8, 10, 9,    // 下面
    12, 13, 14, 12, 14, 15, // 上面
    16, 17, 18, 16, 18, 19, // 左面
    20, 21, 22, 20, 22, 23, // 右面
];

#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable)]
pub struct InstanceRaw {
    pub position: [f32; 3],
    pub block_type: u32,
}

impl InstanceRaw {
    pub fn desc() -> wgpu::VertexBufferLayout<'static> {
        use std::mem;
        wgpu::VertexBufferLayout {
            array_stride: mem::size_of::<InstanceRaw>() as wgpu::BufferAddress,
            step_mode: wgpu::VertexStepMode::Instance,
            attributes: &[
                wgpu::VertexAttribute {
                    offset: 0,
                    shader_location: 2,
                    format: wgpu::VertexFormat::Float32x3,
                },
                wgpu::VertexAttribute {
                    offset: mem::size_of::<[f32; 3]>() as wgpu::BufferAddress,
                    shader_location: 3,
                    format: wgpu::VertexFormat::Uint32,
                },
            ],
        }
    }
}
