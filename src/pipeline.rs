use wgpu::util::DeviceExt;

pub struct PipelineRegistry {
    pub general_uniform_bind_group_layout: wgpu::BindGroupLayout,
    pub camera_uniform_bind_group_layout: wgpu::BindGroupLayout,
    pub storage_bind_group_layout: wgpu::BindGroupLayout,
    pub general_uniform_buffer: wgpu::Buffer,

    pub general_uniform_bind_group: wgpu::BindGroup,
    pub render_pipeline_layout: wgpu::PipelineLayout,
    pub blocks_render_pipeline: wgpu::RenderPipeline,
    pub sky_render_pipeline: wgpu::RenderPipeline,   
}

#[repr(C)]
#[derive(Copy, Clone, Debug, bytemuck::Pod, bytemuck::Zeroable)]
struct GeneralUniform {
    time: f32,
    _p1: [f32; 3],
}

impl PipelineRegistry {
    pub fn new(device: &wgpu::Device, config: &wgpu::SurfaceConfiguration) -> Self {
        let general_uniform_bind_group_layout =
            device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
                entries: &[wgpu::BindGroupLayoutEntry {
                    binding: 0, // シェーダー内の @binding(0) に対応
                    visibility: wgpu::ShaderStages::VERTEX | wgpu::ShaderStages::FRAGMENT, // 頂点シェーダーから参照
                    ty: wgpu::BindingType::Buffer {
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                }],
                label: Some("Uniform Bind Group Layout"),
            });

        let camera_uniform_bind_group_layout =
            device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
                entries: &[wgpu::BindGroupLayoutEntry {
                    binding: 0,
                    visibility: wgpu::ShaderStages::VERTEX | wgpu::ShaderStages::FRAGMENT,
                    ty: wgpu::BindingType::Buffer {
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                }],
                label: Some("camera_bind_group_layout"),
            });

        let shader = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("Shader"),
            source: wgpu::ShaderSource::Wgsl(include_str!("shader.wgsl").into()),
        });

        let storage_bind_group_layout = device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
            label: Some("Storage Bind Group Layout"),
            entries: &[wgpu::BindGroupLayoutEntry {
                binding: 0,
                visibility: wgpu::ShaderStages::FRAGMENT | wgpu::ShaderStages::VERTEX,
                ty: wgpu::BindingType::Buffer {
                    ty: wgpu::BufferBindingType::Storage { read_only: true },
                    has_dynamic_offset: false,
                    min_binding_size: None,
                },
                count: None,
            }],
        });

        let render_pipeline_layout = 
            device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
                label: Some("Render Pipeline Layout"),
                bind_group_layouts: &[
                    Some(&general_uniform_bind_group_layout),
                    Some(&camera_uniform_bind_group_layout), 
                    Some(&storage_bind_group_layout),
                ],
                immediate_size: 0,
            });

        let blocks_render_pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("Blocks Render Pipeline"),
            layout: Some(&render_pipeline_layout),

            // 頂点ステージの設定
            vertex: wgpu::VertexState {
                module: &shader,
                entry_point: Some("vs_main"),
                buffers: &[
                    crate::create_terrain::TerrainVertex::desc(), // スロット 0: チャンクメッシュ用 (VertexStepMode::Vertex)
                ],
                compilation_options: Default::default(),
            },

            // フラグメント（ピクセル）ステージの設定
            fragment: Some(wgpu::FragmentState {
                module: &shader,
                entry_point: Some("fs_main"),
                targets: &[Some(wgpu::ColorTargetState {
                    format: config.format,
                    blend: Some(wgpu::BlendState::REPLACE),
                    write_mask: wgpu::ColorWrites::ALL,
                })],
                compilation_options: Default::default(),
            }),

            // プリミティブ形状の設定
            primitive: wgpu::PrimitiveState {
                topology: wgpu::PrimitiveTopology::TriangleList,
                strip_index_format: None,
                front_face: wgpu::FrontFace::Ccw, // 反時計回りを表面とする
                cull_mode: Some(wgpu::Face::Back), // 裏面カリングを有効化（見えない裏面を描画しない）
                ..Default::default()
            },

            // 深度・ステンシルテストの設定（3Dの前後隠面消去処理）
            depth_stencil: Some(wgpu::DepthStencilState {
                format: wgpu::TextureFormat::Depth32Float,
                depth_write_enabled: Some(true), // 深度情報をバッファに書き込む
                depth_compare: Some(wgpu::CompareFunction::Less), // 手前にあるもの（現在の深度より小さいもの）を描画する
                stencil: wgpu::StencilState::default(),
                bias: wgpu::DepthBiasState::default(),
            }),

            // マルチサンプリング（アンチエイリアス）の設定
            multisample: wgpu::MultisampleState {
                count: 1,
                mask: 1,
                alpha_to_coverage_enabled: false,
            },

            multiview_mask: None,
            cache: None,
        });


        let sky_render_pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("Sky Render Pipeline"),
            layout: Some(&render_pipeline_layout),
            vertex: wgpu::VertexState {
                module: &shader,
                entry_point: Some("vs_sky"),
                buffers: &[], // 空描画は頂点バッファを渡さないので、空の配列を指定する
                compilation_options: Default::default(),
            },
            fragment: Some(wgpu::FragmentState {
                module: &shader,
                entry_point: Some("fs_sky"),
                targets: &[Some(wgpu::ColorTargetState {
                    format: config.format,
                    blend: Some(wgpu::BlendState::REPLACE),
                    write_mask: wgpu::ColorWrites::ALL,
                })],
                compilation_options: Default::default(),
            }),
            primitive: wgpu::PrimitiveState {
                topology: wgpu::PrimitiveTopology::TriangleList,
                strip_index_format: None,
                front_face: wgpu::FrontFace::Ccw,
                cull_mode: None, // 全画面三角形がカリングされないように
                ..Default::default()
            },
            depth_stencil: Some(wgpu::DepthStencilState {
                format: wgpu::TextureFormat::Depth32Float,
                depth_write_enabled: Some(false), // 空の深度は深度バッファに書き込まない
                depth_compare: Some(wgpu::CompareFunction::LessEqual),
                stencil: wgpu::StencilState::default(),
                bias: wgpu::DepthBiasState::default(),
            }),
            multisample: wgpu::MultisampleState {
                count: 1,
                mask: 1,
                alpha_to_coverage_enabled: false,
            },
            multiview_mask: None,
            cache: None,
        });

        let general_uniform_buffer = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("General Uniform Buffer"),
            contents: bytemuck::bytes_of(&GeneralUniform {
                time: 0.0,
                _p1: [0.,0.,0.],
            }),
            usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
        });

        let general_uniform_bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
            layout: &general_uniform_bind_group_layout,
            entries: &[wgpu::BindGroupEntry {
                binding: 0,
                resource: general_uniform_buffer.as_entire_binding(),
            }],
            label: Some("Uniform Bind Group"),
        });

        Self {
            general_uniform_bind_group_layout,
            camera_uniform_bind_group_layout,
            general_uniform_buffer,
            general_uniform_bind_group,
            storage_bind_group_layout,

            render_pipeline_layout,
            blocks_render_pipeline,
            sky_render_pipeline,
        }
    }

    pub fn update_general_uniform(&self, queue: &wgpu::Queue, time: f32) {
        queue.write_buffer(
            &self.general_uniform_buffer,
            0,
            bytemuck::bytes_of(&GeneralUniform {
                time: time,
                _p1: [0.0, 0.0, 0.0],
            }),
        );
    }
}