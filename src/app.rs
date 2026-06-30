use crate::gpu::GpuContext;
use crate::world::World;
use crate::pipeline::PipelineRegistry;

pub struct Application {
    pub surface:   wgpu::Surface<'static>,
    pub gpu:       GpuContext,
    pub pipelines: PipelineRegistry,
    pub world:     World,
}