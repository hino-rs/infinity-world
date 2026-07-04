#![allow(clippy::upper_case_acronyms)]
#![allow(unused)]

use crate::consts::{X_STRIDE, Y_STRIDE, Z_STRIDE};

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

#[repr(C)]
#[derive(Clone, Copy, PartialEq)]
pub struct IndexVec<const SIZE: usize, const HEIGHT: usize> {
    pub x: usize,
    pub y: usize,
    pub z: usize,
}

impl <const SIZE: usize, const HEIGHT: usize>IndexVec<SIZE, HEIGHT> {
    const X_STRIDE: usize = SIZE;
    const Y_STRIDE: usize = SIZE * HEIGHT;
    
    #[inline]
    #[must_use]
    pub const fn splat(v: usize) -> Self {
        Self { x: v, y: v, z: v }
    }

    #[inline]
    #[must_use]
    pub const fn new(x: usize, y: usize, z: usize) -> Self {
        Self { x, y, z }
    }

    #[inline]
    #[must_use]
    pub const fn to_index(self) -> usize {
        self.x * Self::X_STRIDE + self.y * Self::Y_STRIDE + self.z
    }

    #[inline]
    #[must_use]
    pub const fn up(&self) -> usize {
        self.x * Self::X_STRIDE + (self.y+1) * Self::Y_STRIDE + self.z
    }

    #[inline]
    #[must_use]
    pub const fn down(&self) -> usize {
        self.x * Self::X_STRIDE + (self.y-1) * Self::Y_STRIDE + self.z
    }

    #[inline]
    #[must_use]
    pub const fn left(&self) -> usize {
        (self.x-1) * Self::X_STRIDE + self.y * Self::Y_STRIDE + self.z
    }
    #[inline]
    #[must_use]
    pub const fn right(&self) -> usize {
        (self.x+1) * Self::X_STRIDE + self.y * Self::Y_STRIDE + self.z
    }
    
    #[inline]
    #[must_use]
    pub const fn front(&self) -> usize {
        self.x * Self::X_STRIDE + self.y * Self::Y_STRIDE + (self.z-1)
    }

    #[inline]
    #[must_use]
    pub const fn back(&self) -> usize {
        self.x * Self::X_STRIDE + self.y * Self::Y_STRIDE + (self.z+1)
    }
}

impl XZf {
    pub const ORIGIN: Self = Self::splat(0.0);

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
    pub const ORIGIN: Self = Self::splat(0);

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
