# Rayon WebAssembly (wasm32-unknown-unknown) 対応ガイド

## 概要
RayonはRustの強力なデータ並列化ライブラリですが、WebAssembly（`wasm32-unknown-unknown`）環境では標準でシングルスレッドのフォールバック動作となります。
WebAssembly上でマルチスレッド（Web Worker + `SharedArrayBuffer`）による高速な並列処理を実現するためには、`wasm-bindgen-rayon` を使用した環境構成とビルド設定が必要です。

## 前提要件と動作原理
- **Web Workers**: RustのRayonスレッドプールはブラウザのWeb Workerとして動作します。
- **SharedArrayBuffer**: 各ワーカー間でメモリを共有するために必要です。セキュリティ上の要件として、HTTPレスポンスに特定の問題対策ヘッダー（COOP/COEP）を設定する必要があります。
- **Atomics & Bulk Memory**: RustコンパイラのWasmターゲット機能 `+atomics,+bulk-memory` を有効化し、標準ライブラリ（`std`）もAtomics対応で再コンパイルする必要があります（`nightly` + `-Z build-std`）。

---

## 設定手順

### 1. `rust-toolchain.toml` の配置
標準ライブラリ (`std`) のソースコード（`rust-src`）を取得し、`nightly` チャネルを使用するためにプロジェクトルートに `rust-toolchain.toml` を作成します。

```toml
[toolchain]
channel = "nightly"
components = ["rust-src"]
```

### 2. `.cargo/config.toml` の設定
`wasm32-unknown-unknown` ターゲットに対してコンパイラフラグを指定し、`build-std` を有効にします。

```toml
[target.wasm32-unknown-unknown]
rustflags = [
    "-C", "target-feature=+atomics,+bulk-memory,+mutable-globals",
    "-C", "link-arg=--shared-memory",
    "-C", "link-arg=--import-memory",
    "-C", "link-arg=--export-dynamic",
    "-C", "link-arg=--export=__heap_base",
    "-C", "link-arg=--export=__tls_base",
    "-C", "link-arg=--export=__wasm_init_tls",
    "-C", "link-arg=--export=__tls_size",
    "-C", "link-arg=--export=__tls_align",
]

[unstable]
build-std = ["panic_abort", "std"]
```

### 3. `Cargo.toml` の依存関係追加
`wasm-bindgen-rayon` を追加します。

```toml
[dependencies]
rayon = "1.12.0"
wasm-bindgen = "0.2"
wasm-bindgen-rayon = { version = "1.3.0", features = ["no-bundler"] }
```

### 4. `Trunk.toml` および `index.html` の設定 (COOP/COEP ヘッダー & ハッシュ無効化 & SRI警告抑止)
- **`Trunk.toml`**: `SharedArrayBuffer` を有効化するため、COOP/COEPヘッダーを設定します。また、WorkerスレッドがメインJSファイルを名前固定で参照できるよう `filehash = false` を設定します。
- **`index.html`**: `<link data-trunk>` タグに `data-integrity="none"` を指定することで Chrome の preload SRI 警告を抑止します。

```html
<!-- index.html -->
<link data-trunk rel="rust" data-bin="infinity-world" data-integrity="none" href="Cargo.toml">
```

```toml
# Trunk.toml
[build]
target = "index.html"
dist = "dist"
filehash = false

[serve]
port = 8080
open = false
headers = { "Cross-Origin-Opener-Policy" = "same-origin", "Cross-Origin-Embedder-Policy" = "require-corp" }
```

### 5. Rustコードでの初期化処理 (`src/main.rs`)

`wasm-bindgen-rayon` が提供する初期化処理を JS 側へエクスポートし、Wasm起動時（`#[wasm_bindgen(start)]` など）に `init_thread_pool` を呼び出します。

```rust
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// JavaScript側へ initThreadPool を公開
#[cfg(target_arch = "wasm32")]
pub use wasm_bindgen_rayon::init_thread_pool;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(start)]
pub async fn run() {
    console_error_panic_hook::set_once();
    wasm_logger::init(wasm_logger::Config::default());

    // Web Worker内ではなく、メインスレッド（windowが存在する）の場合のみ初期化・起動を行う
    if let Some(web_window) = web_sys::window() {
        let concurrency = web_window.navigator().hardware_concurrency() as usize;
            
        if let Err(e) = wasm_bindgen_rayon::init_thread_pool(concurrency).await {
            log::error!("Failed to initialize rayon thread pool: {:?}", e);
        }

        // アプリケーションの開始処理...
    }
}
```

---

## トラブルシューティング & 注意点

1. **`error: Did you forget to enable atomics and bulk-memory features...`**
   - 原因: コンパイラフラグ `+atomics,+bulk-memory` が設定されていないか、`std` が Atomics 対応で再コンパイルされていません。
   - 対策: `rust-toolchain.toml` が `nightly` になっているか、`.cargo/config.toml` に `build-std = ["panic_abort", "std"]` が記載されているか確認してください。

2. **`TypeError: [object Int32Array] is not a shared typed array` (ブラウザのランタイムエラー)**
   - 原因: Wasmリンカーフラグ (`-C link-arg=--shared-memory`, `-C link-arg=--import-memory`) が設定されていないため、Wasmのメモリが `SharedArrayBuffer` ではなく通常の `ArrayBuffer` として構築されています。
   - 対策: `.cargo/config.toml` の `rustflags` に `"-C", "link-arg=--shared-memory"` および `"-C", "link-arg=--import-memory"` を追加してください。

3. **`SharedArrayBuffer is not defined` (ブラウザのランタイムエラー)**
   - 原因: レスポンスヘッダーに COOP / COEP が設定されていないため、ブラウザがセキュリティ制限により `SharedArrayBuffer` の使用をブロックしています。
   - 対策: 本番Webサーバー（Nginx, Cloudflare Pages, S3等）および開発サーバー (`Trunk.toml`) に以下のヘッダーを設定してください。
     - `Cross-Origin-Opener-Policy: same-origin`
     - `Cross-Origin-Embedder-Policy: require-corp`

5. **`failed to find __heap_base / __wasm_init_tls / __tls_size` 等のシンボル不足エラー (Trunk / wasm-bindgen ビルドエラー)**
   - 原因: `wasm-bindgen` がスレッドパッチ処理の際に必要とする内部シンボル (`__heap_base`, `__tls_base`, `__wasm_init_tls`, `__tls_size`, `__tls_align`) がリンク最適化で除去されています。
   - 対策: `.cargo/config.toml` の `rustflags` にこれらのシンボルをすべてエクスポートするオプション (`"-C", "link-arg=--export=..."`) を追加してください。

6. **`Import #0 "__wbindgen_placeholder__": module is not an object or function` (ブラウザのランタイムエラー)**
   - 原因: TrunkがデフォルトでJS/Wasmファイル名にランダムなハッシュ（例: `infinity-world-cbf6e7dceb65bb0e.js`）を付与するため、Web WorkerがメインJS (`./infinity-world.js`) を読み込む際に名前の不一致による 404 エラーが発生し、モジュール読み込みに失敗します。
   - 対策: `Trunk.toml` の `[build]` セクションに `filehash = false` を追加し、ハッシュ無効化（固定ファイル名出力 `infinity-world.js`）を行ってください。また、`Cargo.toml` の `wasm-bindgen-rayon` に `features = ["no-bundler"]` が指定されているか確認してください。
