use std::sync::mpsc;

use wgpu::{
    BindGroup, BindGroupDescriptor, BindGroupEntry, BindGroupLayoutDescriptor,
    BindGroupLayoutEntry, BindingType, Buffer, BufferAddress, BufferBindingType, BufferDescriptor,
    BufferUsages, ComputePassDescriptor, ComputePipeline, ComputePipelineDescriptor, Device,
    MapMode, PipelineLayoutDescriptor, PollType, Queue, ShaderModuleDescriptor, ShaderStages,
    util::{BufferInitDescriptor, DeviceExt},
    wgt::CommandEncoderDescriptor,
};

use crate::{consts::{CHUNK_VOLUME, NUM_CHUNK_BLOCKS}, game::BlockType, terrain::ChunkBlocks};

#[repr(C)]
#[derive(Clone, Copy, bytemuck::Pod, bytemuck::Zeroable)]
pub struct ChunkUniforms {
    pub chunk_pos: [i32; 3],
    pub _p: i32,
}

pub struct Compute {
    chunkmaker_staging_buffer: Buffer,
    chunkmaker_bind_group: BindGroup,
    chunkmaker_pipeline: ComputePipeline,
    chunkmaker_storage_buffer: Buffer,
    chunkmaker_data_size: BufferAddress,
    chunkmaker_uniform_buffer: Buffer,
}

impl Compute {
    pub fn build(device: &Device) -> Self {
        let (
            chunkmaker_staging_buffer,
            chunkmaker_bind_group,
            chunkmaker_pipeline,
            chunkmaker_storage_buffer,
            chunkmaker_data_size,
            chunkmaker_uniform_buffer,
        ) = Self::build_chunk_maker(device);

        Self {
            chunkmaker_staging_buffer,
            chunkmaker_bind_group,
            chunkmaker_pipeline,
            chunkmaker_storage_buffer,
            chunkmaker_data_size,
            chunkmaker_uniform_buffer,
        }
    }

    pub fn build_chunk_maker(
        device: &Device,
    ) -> (Buffer, BindGroup, ComputePipeline, Buffer, BufferAddress, Buffer) {
        let init_chunk = vec![0; CHUNK_VOLUME];
        let size = (init_chunk.len() * std::mem::size_of::<u32>()) as BufferAddress;

        let storage_buffer = device.create_buffer_init(&BufferInitDescriptor {
            label: Some("ChunkMaker Storage Buffer"),
            contents: bytemuck::cast_slice(&init_chunk),
            usage: BufferUsages::STORAGE | BufferUsages::COPY_SRC,
        });

        let staging_buffer = device.create_buffer(&BufferDescriptor {
            label: Some("ChunkMaker Staging Buffer"),
            size,
            usage: BufferUsages::MAP_READ | BufferUsages::COPY_DST,
            mapped_at_creation: false,
        });

        let shader = device.create_shader_module(ShaderModuleDescriptor {
            label: Some("ChunkMaker Shader"),
            source: wgpu::ShaderSource::Wgsl(include_str!("chunk.wgsl").into()),
        });

        let uniform_buffer = device.create_buffer(&BufferDescriptor {
            label: Some("Chunk Uniform Buffer"),
            size: std::mem::size_of::<ChunkUniforms>() as BufferAddress,
            usage: BufferUsages::UNIFORM | BufferUsages::COPY_DST,
            mapped_at_creation: false,
        });

        let bind_group_layout = device.create_bind_group_layout(&BindGroupLayoutDescriptor {
            label: Some("ChunkMaker Bind Group Layout"),
            entries: &[
                BindGroupLayoutEntry {
                    binding: 0,
                    visibility: ShaderStages::COMPUTE,
                    ty: BindingType::Buffer {
                        ty: BufferBindingType::Storage { read_only: false },
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                },
                BindGroupLayoutEntry {
                    binding: 1,
                    visibility: ShaderStages::COMPUTE,
                    ty: BindingType::Buffer {
                        ty: BufferBindingType::Uniform,
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
                    resource: storage_buffer.as_entire_binding(),
                },
                BindGroupEntry {
                    binding: 1,
                    resource: uniform_buffer.as_entire_binding(),
                }
            ],
        });

        let pipeline_layout = device.create_pipeline_layout(&PipelineLayoutDescriptor {
            label: Some("ChunkMaker Pipeline Layout"),
            bind_group_layouts: &[Some(&bind_group_layout)],
            immediate_size: 0,
        });

        let compute_pipeline = device.create_compute_pipeline(&ComputePipelineDescriptor {
            label: Some("ChunkMaker Compute Pipeline"),
            layout: Some(&pipeline_layout),
            module: &shader,
            entry_point: Some("main"),
            compilation_options: Default::default(),
            cache: None,
        });



        (
            staging_buffer,
            bind_group,
            compute_pipeline,
            storage_buffer,
            size,
            uniform_buffer,
        )
    }

    pub fn update(&self, device: &Device, queue: &Queue, pos: [i32; 3]) {
        queue.write_buffer(
            &self.chunkmaker_uniform_buffer, // 保持しているuniform_buffer
            0,
            bytemuck::bytes_of(&ChunkUniforms {
                chunk_pos: pos,
                _p: 0,
            }),
        );

        let mut encoder = device.create_command_encoder(&CommandEncoderDescriptor {
            label: Some("Compute Command Encoder"),
        });

        {
            let mut cp = encoder.begin_compute_pass(&ComputePassDescriptor {
                label: Some("Compute Pass"),
                timestamp_writes: None,
            });

            cp.set_pipeline(&self.chunkmaker_pipeline);
            cp.set_bind_group(0, &self.chunkmaker_bind_group, &[]);

            cp.dispatch_workgroups(4, 4, 1);
        }

        encoder.copy_buffer_to_buffer(
            &self.chunkmaker_storage_buffer,
            0,
            &self.chunkmaker_staging_buffer,
            0,
            self.chunkmaker_data_size,
        );

        queue.submit(std::iter::once(encoder.finish()));
    }

    pub fn get(&self, device: &Device) -> Option<Box<ChunkBlocks>> {
        let chunkmaker_buffer_slice = self.chunkmaker_staging_buffer.slice(..);
        let (sender, receiver) = mpsc::channel();

        chunkmaker_buffer_slice.map_async(MapMode::Read, move |v| {
            sender.send(v).unwrap();
        });

        device
            .poll(PollType::Wait {
                submission_index: None,
                timeout: None,
            })
            .unwrap();

        if let Ok(Ok(())) = receiver.recv() {
            // バッファのメモリ領域を見る
            let chunk_data = chunkmaker_buffer_slice.get_mapped_range();
            // &[u8]から&[u32]に復元
            let chunk_result: &[BlockType] = unsafe {
                std::slice::from_raw_parts(
                    chunk_data.as_ptr() as *const BlockType,
                    NUM_CHUNK_BLOCKS,
                )
            };

            let blocks: Box<ChunkBlocks> = Box::new(chunk_result.try_into().unwrap());
            
            // 見るためのハンドルを片付けてバッファを閉じる
            drop(chunk_data);
            self.chunkmaker_staging_buffer.unmap();
            
            Some(blocks)
        } else {
            println!("データの回収に失敗しました");
            None
        }
    }
}
