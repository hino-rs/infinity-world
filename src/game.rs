/// ブロックの種類
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[repr(u32)]
pub enum BlockType {
    // --- 基本: 0~ ---
    Air       = 0,
    Stone     = 1,
    Dirt      = 2,
    Grass     = 3,
    Sand      = 4,
    Gravel    = 5, // 砂利
    SnowLayer = 6, // 積雪
    Sandstone = 7, // 砂岩
    Clay      = 8, // 粘土
    
    // --- 岩石系: 20~ ---
    Granite   = 20, // 花崗岩
    Basalt    = 21, // 玄武岩
    Limestone = 22, // 石灰岩 
    Slate     = 23, // 粘板岩
    Shale     = 24, // 頁岩
    Chalk     = 25, // 白亜
    Tuff      = 26, // 凝灰岩
    Obsidian  = 27, // 黒曜石
    Bedrock   = 28, // 岩盤

    // --- 土壌・地表被覆系: 60~ ---
    Moss         = 60,
    Podzol       = 61, // ポドゾル
    Mud          = 62,
    Peat         = 63, // 泥灰
    Ash          = 64, // 火山灰土
    CrackedEarth = 65, // 乾裂土
    Permafrost   = 66, // 永久凍土
    Latosol      = 67, // 酸性の赤土

    // --- 水・氷・溶岩: 100~ ---
    Water     = 100,
    Ice       = 101,
    Glacier   = 102, // 氷河氷
    SnowBlock = 103,
    Lava      = 104, // 溶岩

    // --- 砕屑・稚積: 120~ ---
    Shingle = 120, // 礫 
    Pebbles = 121, // 玉砂利
    Silt    = 122, // シルト
    Scree   = 123, // ガレ

    // --- 鉱脈など: 150~ ---
    CoalSeam     = 150, // 石炭層
    CopperPatina = 151, // 緑青
    IronStain    = 152, // 酸化鉄
    QuartzVein   = 153, // 石英脈

    // --- その他・テスト: 190~ ---
}
