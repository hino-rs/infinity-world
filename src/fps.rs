use web_time::Instant;
use std::collections::VecDeque;

/// FPS計測に必要な情報をまとめた構造体
pub struct FpsCounter {
    pub last_frame: Instant,
    pub frame_times: VecDeque<f64>,
    pub max_samples: usize,
    pub cached_fps: f64,
}

impl FpsCounter {
    /// コンストラクタ。サンプル数を渡してください。
    pub fn new(samples: usize) -> Self {
        Self {
            last_frame: Instant::now(),
            frame_times: VecDeque::with_capacity(samples),
            max_samples: samples,
            cached_fps: 0.0,
        }
    }

    /// 経過時間を計算してFPSを計算します。ループ毎1度だけ呼んでください。
    pub fn tick(&mut self) -> f64 {
        let now = Instant::now();
        let delta = now.duration_since(self.last_frame).as_secs_f64();
        self.last_frame = now;

        if self.frame_times.len() >= self.max_samples {
            self.frame_times.pop_front();
        }
        self.frame_times.push_back(delta);

        // FPS計算
        let avg_delta = self.frame_times.iter().sum::<f64>() / self.frame_times.len() as f64;
        self.cached_fps = if avg_delta > 0.0 {
            1.0 / avg_delta
        } else {
            0.0
        };

        delta
    }

    /// キャッシュされたFPSを返します
    pub fn fps(&self) -> f64 {
        self.cached_fps
    }
}
