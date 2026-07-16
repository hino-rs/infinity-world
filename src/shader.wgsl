struct CameraUniform {
    view_proj: mat4x4f,
    inv_view_proj: mat4x4f,
    eye_position: vec4f,
};
@group(1) @binding(0) var<uniform> camera: CameraUniform;

struct GeneralUniforms {
    time: f32,
};

@group(0) @binding(0) var<uniform> g_u: GeneralUniforms;

struct VsOut {
    @builtin(position) clip_pos: vec4f,
    @location(0) color: vec4f,
    @location(1) tex_coords: vec2f,
    @location(2) normal: vec3f,
};

struct VsOutSky {
    @builtin(position) clip_pos: vec4f,
    @location(0) view_dir: vec3f, // 頂点からフラグメントへ補間される視線方向
}

@vertex
fn vs_main(
    @location(0) pos: vec3f,
    @location(1) tex_coords: vec2f,
    @location(2) block_type: u32,
    @location(3) ao_factor: f32,
    @location(4) normal: vec3f, 
) -> VsOut {
    var out: VsOut;
    let world_pos = pos;
    out.clip_pos = camera.view_proj * vec4f(world_pos, 1.0);
    out.tex_coords = tex_coords;

    var base_color = vec4f(1.0);
    switch block_type {
        // --- 基本 ---
        case 0u:    { base_color = vec4f(0.0); }                      // Air
        case 1u:    { base_color = vec4f(0.4, 0.4, 0.4, 1.0); }       // Stone
        case 2u:    { base_color = vec4f(0.7, 0.45, 0.25, 1.0); }     // Dirt
        case 3u:    { base_color = vec4f(0.48, 0.55, 0.26, 1.0); }    // Grass
        case 4u:    { base_color = vec4f(0.86, 0.78, 0.53, 1.0); }    // Sand
        case 5u:    { base_color = vec4f(0.55, 0.52, 0.50, 1.0); }    // Gravel
        case 6u:    { base_color = vec4f(0.95, 0.98, 0.98, 1.0); }    // SnowLayer
        case 7u:    { base_color = vec4f(0.78, 0.68, 0.48, 1.0); }    // Sandstone
        case 8u:    { base_color = vec4f(0.62, 0.58, 0.56, 1.0); }    // Clay

        // --- 岩石系 ---
        case 20u:   { base_color = vec4f(0.65, 0.55, 0.55, 1.0); }    // Granite
        case 21u:   { base_color = vec4f(0.20, 0.20, 0.22, 1.0); }    // Basalt
        case 22u:   { base_color = vec4f(0.78, 0.76, 0.70, 1.0); }    // Limestone
        case 23u:   { base_color = vec4f(0.28, 0.31, 0.34, 1.0); }    // Slate
        case 24u:   { base_color = vec4f(0.42, 0.40, 0.38, 1.0); }    // Shale
        case 25u:   { base_color = vec4f(0.92, 0.92, 0.90, 1.0); }    // Chalk
        case 26u:   { base_color = vec4f(0.48, 0.50, 0.45, 1.0); }    // Tuff
        case 27u:   { base_color = vec4f(0.10, 0.08, 0.12, 1.0); }    // Obsidian
        case 28u:   { base_color = vec4f(0.15, 0.15, 0.15, 1.0); }    // Bedrock

        // --- 土壌・地表被覆系 ---
        case 60u:   { base_color = vec4f(0.30, 0.45, 0.20, 1.0); }    // Moss
        case 61u:   { base_color = vec4f(0.35, 0.25, 0.18, 1.0); }    // Podzol
        case 62u:   { base_color = vec4f(0.28, 0.20, 0.15, 1.0); }    // Mud
        case 63u:   { base_color = vec4f(0.22, 0.16, 0.12, 1.0); }    // Peat
        case 64u:   { base_color = vec4f(0.45, 0.43, 0.42, 1.0); }    // Ash
        case 65u:   { base_color = vec4f(0.65, 0.48, 0.33, 1.0); }    // CrackedEarth
        case 66u:   { base_color = vec4f(0.40, 0.45, 0.50, 1.0); }    // Permafrost
        case 67u:   { base_color = vec4f(0.71, 0.44, 0.42, 1.0); }
        case 68u:   { base_color = vec4f(0.76, 0.52, 0.35, 1.0); }    // RedYellowSoil
        case 69u:   { base_color = vec4f(0.18, 0.18, 0.20, 1.0); }    // Regur
        case 70u:   { base_color = vec4f(0.50, 0.28, 0.22, 1.0); }    // TerraRoxa
        case 71u:   { base_color = vec4f(0.16, 0.14, 0.12, 1.0); }    // Chernozem
        case 72u:   { base_color = vec4f(0.26, 0.20, 0.15, 1.0); }    // PrairieSoil
        case 73u:   { base_color = vec4f(0.48, 0.36, 0.24, 1.0); }    // ChestnutSoil
        case 74u:   { base_color = vec4f(0.42, 0.28, 0.18, 1.0); }    // BrownForestSoil
        case 75u:   { base_color = vec4f(0.68, 0.36, 0.26, 1.0); }    // TerraRossa
        case 76u:   { base_color = vec4f(0.52, 0.50, 0.46, 1.0); }    // AlpineSoil
        case 77u:   { base_color = vec4f(0.32, 0.36, 0.34, 1.0); }    // TundraSoil

        // --- 水・凍り・溶岩 ---
        case 100u:  { base_color = vec4f(0.15, 0.45, 0.80, 0.6); }    // Water
        case 101u:  { base_color = vec4f(0.65, 0.85, 0.95, 0.7); }    // Ice
        case 102u:  { base_color = vec4f(0.45, 0.75, 0.85, 0.9); }    // Glacier
        case 103u:  { base_color = vec4f(0.98, 0.98, 1.0, 1.0); }     // SnowBlock
        case 104u:  { base_color = vec4f(0.95, 0.35, 0.05, 1.0); }    // Lava

        // --- 砕屑・稚積 ---
        case 120u:  { base_color = vec4f(0.50, 0.48, 0.48, 1.0); }    // Shingle
        case 121u:  { base_color = vec4f(0.60, 0.58, 0.58, 1.0); }    // Pebbles
        case 122u:  { base_color = vec4f(0.62, 0.55, 0.45, 1.0); }    // Silt
        case 123u:  { base_color = vec4f(0.58, 0.56, 0.54, 1.0); }    // Scree

        // --- 鉱脈など ---
        case 150u:  { base_color = vec4f(0.12, 0.12, 0.12, 1.0); }    // CoalSeam
        case 151u:  { base_color = vec4f(0.25, 0.65, 0.55, 1.0); }    // CopperPatina
        case 152u:  { base_color = vec4f(0.65, 0.25, 0.15, 1.0); }    // IronStain
        case 153u:  { base_color = vec4f(0.88, 0.90, 0.92, 1.0); }    // QuartzVein

        default:    { base_color = vec4f(1.0, 0.0, 1.0, 1.0); }       // 例外
    }

    out.normal = normal;
    out.color = vec4f(base_color.rgb * ao_factor, base_color.a);
    return out;
}

@fragment
fn fs_main(in: VsOut) -> @location(0) vec4f {
    var color = in.color;

    let x = g_u.time * 0.1;
    let sun_dir = normalize(vec3(cos(x), sin(x), 0.0));

    // ランバート
    let normal = normalize(in.normal);
    let diff = max(dot(normal, sun_dir), 0.0);
    
    let light_factor = diff * 0.8 + 0.2;

    color = vec4f(color.rgb * light_factor, color.a);

    // let thickness = 0.01; 
    // let lineColor = vec3(0.0, 0.0, 0.0); // 線の色（黒）

    // // XまたはYが端っこに近いか判定
    // if (in.tex_coords.x < thickness || in.tex_coords.x > 1.0 - thickness ||
    //     in.tex_coords.y < thickness || in.tex_coords.y > 1.0 - thickness) {
    //     color -= 0.1;
    // }

    return color;
}

@vertex
fn vs_sky(@builtin(vertex_index) vertex_index: u32) -> VsOutSky {
    var out: VsOutSky;

    // 画面全体を覆う三角形
    let x = f32(i32(vertex_index & 1u) * 4 - 1);
    let y = f32(i32(vertex_index & 2u) * 2 - 1);
    // Z値を最遠にすることで背景として配置
    out.clip_pos = vec4f(x, y, 0.0, 1.0);

    // 画面上の2D座標を、逆行列を使って3Dへ
    let trget = camera.inv_view_proj * vec4f(x, y, 0.0, 1.0);

    // 3D座標に戻し、カメラ位置を引いてカメラからの視線方向ベクトルを求める
    out.view_dir = trget.xyz;

    return out;
}

@fragment
fn fs_sky(in: VsOutSky) -> @location(0) vec4f {
    let view_dir = normalize(in.view_dir);
    let x = g_u.time*0.1;
    let sun_dir = normalize(vec3f(cos(x), sin(x), 0.0));
    let sky_color = render_sky(view_dir, sun_dir);

    return vec4f(sky_color, 1.0);
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

