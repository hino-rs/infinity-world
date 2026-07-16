struct CameraUniform {
    view_proj: mat4x4f,
    inv_view_proj: mat4x4f,
    eye_position: vec4f,
};
@group(1) @binding(0) var<uniform> camera: CameraUniform;

struct GeneralUniforms {
    time: f32,
};
@group(2) @binding(0) var<uniform> g_u: GeneralUniforms;

@group(0) @binding(0) var color_texture: texture_2d<f32>;
@group(0) @binding(1) var depth_texture: texture_depth_2d;

struct VsOut {
    @builtin(position) clip_pos: vec4f,
    @location(0) tex_coords: vec2f,
    @location(1) ndc_pos: vec2f,
};

@vertex
fn vs_main(@builtin(vertex_index) vertex_index: u32) -> VsOut {
    var out: VsOut;
    // 画面全体を覆う三角形 (NDC: [-1, 1])
    let x = f32(i32(vertex_index & 1u) * 4 - 1);
    let y = f32(i32(vertex_index & 2u) * 2 - 1);
    out.clip_pos = vec4f(x, y, 0.0, 1.0);
    // テクスチャ座標 (UV: [0, 1])
    out.tex_coords = vec2f(x * 0.5 + 0.5, 1.0 - (y * 0.5 + 0.5));
    out.ndc_pos = vec2f(x, y);
    return out;
}

fn render_sky(view_dir: vec3f, sun_dir: vec3f) -> vec3f {
    // 空のグラデーション
    let horizon_dot = max(0.0, view_dir.y);
    let sky_color = mix(vec3f(0.5, 0.7, 1.0), vec3f(0.1, 0.3, 0.8), horizon_dot);

    // 太陽の描画
    let sun_dot = max(0.0, dot(view_dir, sun_dir));

    // 太陽のサイズはyに基づかせる
    let sun_h = max(0.0, sun_dir.y);
    let size_exp = mix(800.0, 200.0, sun_h);
    let glow_exp = mix(30.0, 10.0, sun_h);

    // 太陽の輪郭をシャープにする
    let sun_size = pow(sun_dot, size_exp);
    let sun_glow = pow(sun_dot, glow_exp); // 太陽の周りのぼんやりした光

    let sun_color = vec3f(1.0, 0.9, 0.7) * sun_size + vec3f(1.0, 0.6, 0.3) * sun_glow;

    return sky_color + sun_color;
}

@fragment
fn fs_main(in: VsOut) -> @location(0) vec4f {
    // ピクセル座標
    let coords = vec2i(in.clip_pos.xy);

    // 元の色と深度値を取得
    let base_color = textureLoad(color_texture, coords, 0);
    let depth = textureLoad(depth_texture, coords, 0);

    // 空（背景）はフォグ処理をしない、または極小深度（Reversed-Zで0.0）はそのまま返す
    if (depth <= 0.000001) {
        return base_color;
    }

    // NDC位置を構成し、ワールド空間に戻す
    let ndc_pos = vec4f(in.ndc_pos.x, in.ndc_pos.y, depth, 1.0);
    let world_pos_w = camera.inv_view_proj * ndc_pos;
    let world_pos = world_pos_w.xyz / world_pos_w.w;

    // カメラからの距離と方向
    let view_vector = world_pos - camera.eye_position.xyz;
    let view_dist = length(view_vector);
    let view_dir = normalize(view_vector);

    // 線形フォグのブレンド率
    let fog_start = 2048.0;
    let fog_end = 4096.0;
    let fog_factor = clamp((view_dist - fog_start) / (fog_end - fog_start), 0.0, 1.0);

    // 太陽方向の取得
    let t = g_u.time * 0.1;
    let sun_dir = normalize(vec3f(cos(t), sin(t), 0.0));

    // フォグ色（空の色と同期）
    let fog_color = render_sky(view_dir, sun_dir);

    // 線形補間
    let final_rgb = mix(base_color.rgb, fog_color, fog_factor);

    return vec4f(final_rgb, base_color.a);
}
