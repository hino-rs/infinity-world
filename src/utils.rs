#![allow(clippy::upper_case_acronyms)]
#![allow(unused)]

#[repr(C)]
#[derive(Clone, Copy, PartialEq)]
pub struct XZf {
    pub x: f32,
    pub z: f32,
}

#[repr(C)]
#[derive(Clone, Copy, PartialEq)]
pub struct XZi {
    pub x: i32,
    pub z: i32,
}

impl XZf {
    pub const ZERO: Self = Self::splat(0.0);

    #[inline]
    #[must_use]
    pub const fn splat(v: f32) -> Self {
        Self { x: v, z: v }
    }

    #[inline]
    #[must_use]
    pub const fn new(x: f32, z: f32) -> Self {
        Self { x, z }
    }

    #[inline]
    #[must_use]
    pub fn length(&self) -> f32 {
        (self.x * self.x + self.z * self.z).sqrt()
    }
}

impl XZi {
    pub const ZERO: Self = Self::splat(0);

    #[inline]
    #[must_use]
    pub const fn splat(v: i32) -> Self {
        Self { x: v, z: v }
    }

    #[inline]
    #[must_use]
    pub const fn new(x: i32, z: i32) -> Self {
        Self { x, z }
    }

    #[inline]
    #[must_use]
    pub fn length(&self) -> i32 {
        let x = self.x as f32;
        let z = self.z as f32;
        (x * x + z * z).sqrt() as i32
    }
}