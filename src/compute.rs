use std::sync::mpsc;

use glam::USizeVec2;
use wgpu::{
    BindGroup, BindGroupDescriptor, BindGroupEntry, BindGroupLayoutDescriptor,
    BindGroupLayoutEntry, BindingType, Buffer, BufferAddress, BufferBindingType, BufferDescriptor,
    BufferUsages, ComputePassDescriptor, ComputePipeline, ComputePipelineDescriptor, Device,
    MapMode, PipelineLayoutDescriptor, Queue, ShaderModuleDescriptor, ShaderSource, ShaderStages,
    util::{BufferInitDescriptor, DeviceExt},
    wgt::CommandEncoderDescriptor,
};

use crate::types::*;
use crate::{
    consts::{BATCH_SIZE, NUM_CHUNK_BLOCKS},
    game::BlockType,
};

#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable, Default)]
pub struct ChunkUniforms {
    pub chunk_pos: [i32; 3],
    pub seed: i32,
}

impl ChunkUniforms {
    pub fn new(seed: i32) -> Self {
        Self {
            chunk_pos: [0, 0, 0],
            seed,
        }
    }
}

/// 環境データ
#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable, Default)]
pub struct EnvData {
    pub temp_and_mois: u32,      // 気温と湿潤度
    pub wind_dir_and_speed: u32, // 風の向きと速度
}

pub struct Compute {
    blocks_staging_buffer: Buffer,
    env_staging_buffer: Buffer,
    chunkmaker_bind_group: BindGroup,
    env_pipeline: ComputePipeline,
    biome_pipeline: ComputePipeline,
    terrain_pipeline: ComputePipeline,
    blocks_storage_buffer: Buffer,
    env_storage_buffer: Buffer,
    chunkmaker_data_size: BufferAddress,
    env_data_size: BufferAddress,
    chunkmaker_uniform_buffer: Buffer,
}

impl Compute {
    pub fn build(device: &Device) -> Self {
        let (
            blocks_staging_buffer,
            env_staging_buffer,
            chunkmaker_bind_group,
            env_pipeline,
            biome_pipeline,
            terrain_pipeline,
            blocks_storage_buffer,
            env_storage_buffer,
            chunkmaker_data_size,
            env_data_size,
            chunkmaker_uniform_buffer,
        ) = Self::build_chunk_maker(device);

        Self {
            blocks_staging_buffer,
            env_staging_buffer,
            chunkmaker_bind_group,
            env_pipeline,
            biome_pipeline,
            terrain_pipeline,
            blocks_storage_buffer,
            env_storage_buffer,
            chunkmaker_data_size,
            env_data_size,
            chunkmaker_uniform_buffer,
        }
    }

    pub fn build_chunk_maker(
        device: &Device,
    ) -> (
        Buffer,
        Buffer,
        BindGroup,
        ComputePipeline,
        ComputePipeline,
        ComputePipeline,
        Buffer,
        Buffer,
        BufferAddress,
        BufferAddress,
        Buffer,
    ) {
        let init_chunk = vec![0u32; NUM_CHUNK_BLOCKS * BATCH_SIZE];
        let init_env = vec![EnvData::default(); BATCH_SIZE];
        let size = (init_chunk.len() * std::mem::size_of::<u32>()) as BufferAddress;
        let env_size = (init_env.len() * std::mem::size_of::<EnvData>()) as BufferAddress;

        let blocks_storage_buffer = device.create_buffer_init(&BufferInitDescriptor {
            label: Some("Blocks Storage Buffer"),
            contents: bytemuck::cast_slice(&init_chunk),
            usage: BufferUsages::STORAGE | BufferUsages::COPY_SRC,
        });

        let env_storage_buffer = device.create_buffer_init(&BufferInitDescriptor {
            label: Some("Environment Storage Buffer"),
            contents: bytemuck::cast_slice(&init_env),
            usage: BufferUsages::STORAGE | BufferUsages::COPY_SRC,
        });

        let blocks_staging_buffer = device.create_buffer(&BufferDescriptor {
            label: Some("Blocks Staging Buffer"),
            size,
            usage: BufferUsages::MAP_READ | BufferUsages::COPY_DST,
            mapped_at_creation: false,
        });

        let env_staging_buffer = device.create_buffer(&BufferDescriptor {
            label: Some("Environment Staging Buffer"),
            size: env_size,
            usage: BufferUsages::MAP_READ | BufferUsages::COPY_DST,
            mapped_at_creation: false,
        });

        let uniform_buffer = device.create_buffer(&BufferDescriptor {
            label: Some("Chunk Uniform Buffer"),
            size: (std::mem::size_of::<ChunkUniforms>() * BATCH_SIZE) as BufferAddress,
            usage: BufferUsages::STORAGE | BufferUsages::COPY_DST,
            mapped_at_creation: false,
        });

        let bind_group_layout = device.create_bind_group_layout(&BindGroupLayoutDescriptor {
            label: Some("ChunkMaker Bind Group Layout"),
            entries: &[
                BindGroupLayoutEntry {
                    binding: 0,
                    visibility: ShaderStages::COMPUTE,
                    ty: BindingType::Buffer {
                        ty: BufferBindingType::Storage { read_only: true },
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                },
                BindGroupLayoutEntry {
                    binding: 1,
                    visibility: ShaderStages::COMPUTE,
                    ty: BindingType::Buffer {
                        ty: BufferBindingType::Storage { read_only: false },
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                },
                BindGroupLayoutEntry {
                    binding: 2,
                    visibility: ShaderStages::COMPUTE,
                    ty: BindingType::Buffer {
                        ty: BufferBindingType::Storage { read_only: false },
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                },
            ],
        });

        let bind_group = device.create_bind_group(&BindGroupDescriptor {
            label: Some("ChunkMaker Bind Group"),
            layout: &bind_group_layout,
            entries: &[
                BindGroupEntry {
                    binding: 0,
                    resource: uniform_buffer.as_entire_binding(),
                },
                BindGroupEntry {
                    binding: 1,
                    resource: blocks_storage_buffer.as_entire_binding(),
                },
                BindGroupEntry {
                    binding: 2,
                    resource: env_storage_buffer.as_entire_binding(),
                },
            ],
        });

        let pipeline_layout = device.create_pipeline_layout(&PipelineLayoutDescriptor {
            label: Some("ChunkMaker Pipeline Layout"),
            bind_group_layouts: &[Some(&bind_group_layout)],
            immediate_size: 0,
        });

        let env_shader = device.create_shader_module(ShaderModuleDescriptor {
            label: Some("Environment Shader"),
            source: ShaderSource::Wgsl(include_str!("calc_env.wgsl").into()),
        });

        let biome_shader = device.create_shader_module(ShaderModuleDescriptor {
            label: Some("Biome Shader"),
            source: ShaderSource::Wgsl(include_str!("biome.wgsl").into()),
        });

        let terrain_shader = device.create_shader_module(ShaderModuleDescriptor {
            label: Some("Terrain Shader"),
            source: ShaderSource::Wgsl(include_str!("terrain.wgsl").into()),
        });

        let env_pipeline = device.create_compute_pipeline(&ComputePipelineDescriptor {
            label: Some("Environment Pipeline"),
            layout: Some(&pipeline_layout),
            module: &env_shader,
            entry_point: Some("main"),
            compilation_options: Default::default(),
            cache: None,
        });

        let biome_pipeline = device.create_compute_pipeline(&ComputePipelineDescriptor {
            label: Some("Biome Pipeline"),
            layout: Some(&pipeline_layout),
            module: &biome_shader,
            entry_point: Some("main"),
            compilation_options: Default::default(),
            cache: None,
        });

        let terrain_pipeline = device.create_compute_pipeline(&ComputePipelineDescriptor {
            label: Some("Terrain Pipeline"),
            layout: Some(&pipeline_layout),
            module: &terrain_shader,
            entry_point: Some("main"),
            compilation_options: Default::default(),
            cache: None,
        });

        (
            blocks_staging_buffer,
            env_staging_buffer,
            bind_group,
            env_pipeline,
            biome_pipeline,
            terrain_pipeline,
            blocks_storage_buffer,
            env_storage_buffer,
            size,
            env_size,
            uniform_buffer,
        )
    }

    pub fn update_env(&self, device: &Device, queue: &Queue, uniforms: &[ChunkUniforms]) {
        queue.write_buffer(
            &self.chunkmaker_uniform_buffer,
            0,
            bytemuck::cast_slice(uniforms),
        );

        let mut encoder = device.create_command_encoder(&CommandEncoderDescriptor {
            label: Some("Compute Env Command Encoder"),
        });

        // 環境計算
        {
            let mut cp = encoder.begin_compute_pass(&ComputePassDescriptor {
                label: Some("Environment Pass"),
                timestamp_writes: None,
            });

            cp.set_pipeline(&self.env_pipeline);
            cp.set_bind_group(0, &self.chunkmaker_bind_group, &[]);

            cp.dispatch_workgroups(1, 1, BATCH_SIZE as u32);
        }

        encoder.copy_buffer_to_buffer(
            &self.env_storage_buffer,
            0,
            &self.env_staging_buffer,
            0,
            self.env_data_size,
        );

        queue.submit(std::iter::once(encoder.finish()));
    }

    pub fn update_blocks(&self, device: &Device, queue: &Queue, uniforms: &[ChunkUniforms]) {
        queue.write_buffer(
            &self.chunkmaker_uniform_buffer,
            0,
            bytemuck::cast_slice(uniforms),
        );

        let mut encoder = device.create_command_encoder(&CommandEncoderDescriptor {
            label: Some("Compute Blocks Command Encoder"),
        });

        // 最終的な地形生成
        {
            let mut cp = encoder.begin_compute_pass(&ComputePassDescriptor {
                label: Some("Terrain Pass"),
                timestamp_writes: None,
            });

            cp.set_pipeline(&self.terrain_pipeline);
            cp.set_bind_group(0, &self.chunkmaker_bind_group, &[]);

            cp.dispatch_workgroups(4, 4, BATCH_SIZE as u32);
        }

        encoder.copy_buffer_to_buffer(
            &self.blocks_storage_buffer,
            0,
            &self.blocks_staging_buffer,
            0,
            self.chunkmaker_data_size,
        );

        queue.submit(std::iter::once(encoder.finish()));
    }

    pub fn request_env_async(&self, tx: mpsc::Sender<Result<(), wgpu::BufferAsyncError>>) {
        let slice = self.env_staging_buffer.slice(..);
        slice.map_async(MapMode::Read, move |v| {
            let _ = tx.send(v);
        });
    }

    pub fn read_env(&self) -> Vec<EnvData> {
        let slice = self.env_staging_buffer.slice(..);
        let env_data = slice.get_mapped_range();
        let env_result: &[EnvData] =
            unsafe { std::slice::from_raw_parts(env_data.as_ptr() as *const EnvData, BATCH_SIZE) };

        let data = env_result.to_vec();

        drop(env_data);
        self.env_staging_buffer.unmap();

        data
    }

    pub fn request_blocks_async(&self, tx: mpsc::Sender<Result<(), wgpu::BufferAsyncError>>) {
        let slice = self.blocks_staging_buffer.slice(..);
        slice.map_async(MapMode::Read, move |v| {
            let _ = tx.send(v);
        });
    }

    pub fn read_blocks(&self) -> Vec<Box<ChunkBlocks>> {
        let slice = self.blocks_staging_buffer.slice(..);
        let chunk_data = slice.get_mapped_range();
        let chunk_result: &[BlockType] = unsafe {
            std::slice::from_raw_parts(
                chunk_data.as_ptr() as *const BlockType,
                NUM_CHUNK_BLOCKS * BATCH_SIZE,
            )
        };

        let mut chunks = Vec::with_capacity(BATCH_SIZE);
        for i in 0..BATCH_SIZE {
            let start = i * NUM_CHUNK_BLOCKS;
            let end = start + NUM_CHUNK_BLOCKS;
            let chunk_slice = &chunk_result[start..end];

            let blocks: Box<ChunkBlocks> = Box::new(chunk_slice.try_into().unwrap());
            chunks.push(blocks);
        }

        drop(chunk_data);
        self.blocks_staging_buffer.unmap();

        chunks
    }
}

#[cfg(test)]
mod tests {
    use wgpu::{DeviceDescriptor, Instance, Limits, PowerPreference, RequestAdapterOptions};

    #[test]
    fn test_shader_compilation() {
        pollster::block_on(async {
            let instance = Instance::default();
            let adapter = instance
                .request_adapter(&RequestAdapterOptions {
                    power_preference: PowerPreference::default(),
                    compatible_surface: None,
                    force_fallback_adapter: false,
                })
                .await
                .expect("アダプター作成に失敗");

            let (device, _queue) = adapter
                .request_device(&DeviceDescriptor {
                    label: None,
                    required_features: wgpu::Features::empty(),
                    required_limits: Limits::default(),
                    memory_hints: Default::default(),
                    ..Default::default()
                })
                .await
                .expect("デバイス作成に失敗");

            let _ = device.create_shader_module(wgpu::ShaderModuleDescriptor {
                label: Some("Environment Shader Test"),
                source: wgpu::ShaderSource::Wgsl(include_str!("calc_env.wgsl").into()),
            });

            let _ = device.create_shader_module(wgpu::ShaderModuleDescriptor {
                label: Some("Biome Shader Test"),
                source: wgpu::ShaderSource::Wgsl(include_str!("biome.wgsl").into()),
            });

            let _ = device.create_shader_module(wgpu::ShaderModuleDescriptor {
                label: Some("Terrain Shader Test"),
                source: wgpu::ShaderSource::Wgsl(include_str!("terrain.wgsl").into()),
            });
        });
    }
}
