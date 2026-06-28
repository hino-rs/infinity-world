struct CameraUniform {
    view_proj: mat4x4f,
    inv_view_proj: mat4x4f,
    eye_position: vec4f,
};
@group(1) @binding(0) var<uniform> camera: CameraUniform;

struct Uniforms {
    mvp: mat4x4f,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

struct VsOut {
    @builtin(position) clip_pos: vec4f,
    @location(0) color: vec4f,
    @location(1) tex_coords: vec2f,
};

struct VsOutSky {
    @builtin(position) clip_pos: vec4f,
    @location(0) view_dir: vec3f, // 頂点からフラグメントへ補間される視線方向
}

@vertex
fn vs_main(
    @location(0) pos: vec3f,
    @location(1) tex_coords: vec2f,
    @location(2) instance_pos: vec3f, // インスタンスバッファから渡される各立方体の位置
    @location(3) instance_type: u32,
) -> VsOut {
    var out: VsOut;
    // 頂点の基本位置にインスタンスの位置を足してワールド空間での位置にする
    let world_pos = pos + instance_pos;
    out.clip_pos = camera.view_proj * vec4f(world_pos, 1.0);
    out.tex_coords = tex_coords;

    if instance_type == 0 {
        out.color = vec4f(0.0);
    } else if instance_type == 1 {
        out.color = vec4f(0.4, 0.4, 0.4, 1.0);
    } else if instance_type == 2 {
        out.color = vec4f(0.7, 0.45, 0.25, 1.0);
    } else if instance_type == 3 {
        out.color = vec4f(0.48, 0.55, 0.26, 1.0);
    }
    return out;
}

@fragment
fn fs_main(in: VsOut) -> @location(0) vec4f {
    var color = in.color;

    return color;
}

@vertex
fn vs_sky(@builtin(vertex_index) vertex_index: u32) -> VsOutSky {
    var out: VsOutSky;

    // 画面全体を覆う三角形
    let x = f32(i32(vertex_index & 1u) * 4 - 1);
    let y = f32(i32(vertex_index & 2u) * 2 - 1);
    // Z値を最遠にすることで背景として配置
    out.clip_pos = vec4f(x, y, 1.0, 1.0);

    // 画面上の2D座標を、逆行列を使って3Dへ
    let trget = camera.inv_view_proj * vec4f(x, y, 1.0, 1.0);

    // 3D座標に戻し、カメラ位置を引いてカメラからの視線方向ベクトルを求める
    out.view_dir = (trget.xyz / trget.w) - camera.eye_position.xyz;

    return out;
}

@fragment
fn fs_sky(in: VsOutSky) -> @location(0) vec4f {
    let view_dir = normalize(in.view_dir);
    let sun_dir = normalize(vec3f(1.0));
    let sky_color = render_sky(view_dir, sun_dir);

    return vec4f(sky_color, 1.0);
}

fn render_sky(view_dir: vec3f, sun_dir: vec3f) -> vec3f {
    // 空のグラデーション
    let horizon_dot = max(0.0, view_dir.y);
    let sky_color = mix(vec3f(0.5, 0.7, 1.0), vec3f(0.1, 0.3, 0.8), horizon_dot);

    // 太陽の描画
    let sun_dot = max(0.0, dot(view_dir, sun_dir));

    // 太陽の輪郭をシャープにする
    let sun_size = pow(sun_dot, 500.0);
    let sun_glow = pow(sun_dot, 20.0); // 太陽の周りのぼんやりした光

    let sun_color = vec3f(1.0, 0.9, 0.7) * sun_size + vec3f(1.0, 0.6, 0.3) * sun_glow;

    return sky_color + sun_color;
}