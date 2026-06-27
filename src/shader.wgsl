struct CameraUniform {
    view_proj: mat4x4<f32>,
};
@group(1) @binding(0) var<uniform> camera: CameraUniform;

struct Uniforms {
    mvp: mat4x4<f32>,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

struct VsOut {
    @builtin(position) clip_pos: vec4<f32>,
    @location(0) color: vec3<f32>,
};

@vertex
fn vs_main(
    @location(0) pos: vec3<f32>,
    @location(1) color: vec3<f32>,
    @location(2) instance_pos: vec3<f32>, // インスタンスバッファから渡される各立方体の位置
    @location(3) instance_type: u32,
) -> VsOut {
    var out: VsOut;
    // 頂点の基本位置にインスタンスの位置を足してワールド空間での位置にする
    let world_pos = pos + instance_pos;
    
    out.clip_pos = camera.view_proj * vec4<f32>(world_pos, 1.0);
    // out.color = color;

    if instance_type == 1 {
        out.color = vec3f(0.4, 0.4, 0.4);
    }
    return out;
}

@fragment
fn fs_main(in: VsOut) -> @location(0) vec4<f32> {
    return vec4<f32>(in.color, 1.0);
}
