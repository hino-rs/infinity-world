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
pub struct Vertex {
    /// 3次元空間における位置座標 [x, y, z]
    pub position: [f32; 3],
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
            ],
        }
    }
}

/// 立方体の8個の角頂点
pub const VERTICES: &[Vertex] = &[
    Vertex { position: [-0.5, -0.5, -0.5] }, // 0: 左下奥
    Vertex { position: [0.5, -0.5, -0.5] },  // 1: 右下奥
    Vertex { position: [0.5, 0.5, -0.5] },   // 2: 右上奥
    Vertex { position: [-0.5, 0.5, -0.5] },  // 3: 左上奥
    Vertex { position: [-0.5, -0.5, 0.5] },  // 4: 左下手前
    Vertex { position: [0.5, -0.5, 0.5] },   // 5: 右下手前
    Vertex { position: [0.5, 0.5, 0.5] },    // 6: 右上手前
    Vertex { position: [-0.5, 0.5, 0.5] },   // 7: 左上手前
];

/// 3つの頂点インデックスの組み合わせによって、立方体の各面（ポリゴン）を構成する三角形を定義する。
/// CCW (反時計回り) が表を向くように設定する。
pub const INDICES: &[u16] = &[
    0, 1, 2, 0, 2, 3, // 後ろ面 (Z = -1.0)
    4, 6, 5, 4, 7, 6, // 前面 (Z = 1.0)
    0, 4, 5, 0, 5, 1, // 下面 (Y = -1.0)
    3, 2, 6, 3, 6, 7, // 上面 (Y = 1.0)
    0, 3, 7, 0, 7, 4, // 左面 (X = -1.0)
    1, 5, 6, 1, 6, 2, // 右面 (X = 1.0)
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
