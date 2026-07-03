#![allow(unused)]

use web_time::Instant;
use std::collections::VecDeque;

pub struct FpsCounter {
    pub last_frame: Instant,
    pub frame_times: VecDeque<f64>, // 直近Nフレームの時間
    pub max_samples: usize,
    pub cached_fps: f64,
    pub min_frame_time: f64,
    pub max_frame_time: f64,
}

impl FpsCounter {
    pub fn new(samples: usize) -> Self {
        Self {
            last_frame: Instant::now(),
            frame_times: VecDeque::with_capacity(samples),
            max_samples: samples,
            cached_fps: 0.0,
            min_frame_time: f64::MAX,
            max_frame_time: 0.0,
        }
    }

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

        self.min_frame_time = self.min_frame_time.min(delta);
        self.max_frame_time = self.max_frame_time.max(delta);

        delta
    }

    pub fn fps(&self) -> f64 {
        self.cached_fps
    }

    // フレーム時間
    pub fn frame_time_ms(&self) -> f64 {
        if let Some(&last) = self.frame_times.back() {
            last * 1000.0
        } else {
            0.0
        }
    }

    // 最小FPS
    pub fn min_fps(&self) -> f64 {
        if self.max_frame_time > 0.0 {
            1.0 / self.max_frame_time
        } else {
            0.0
        }
    }

    // 最大FPS
    pub fn max_fps(&self) -> f64 {
        if self.min_frame_time < f64::MAX {
            1.0 / self.min_frame_time
        } else {
            0.0
        }
    }

    // サンプルのリセット
    pub fn reset_stats(&mut self) {
        self.min_frame_time = f64::MAX;
        self.max_frame_time = 0.0;
    }

    pub fn summary(&self) -> String {
        format!(
            "FPS: {:.1} | Frame: {:.2}ms | Min: {:.1} Max: {:.1}",
            self.fps(),
            self.frame_time_ms(),
            self.min_fps(),
            self.max_fps(),
        )
    }
}
