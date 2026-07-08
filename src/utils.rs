#![allow(clippy::upper_case_acronyms)]
#![allow(unused)]

use glam::IVec3;

pub fn manhattan_distance(pos1: IVec3, pos2: IVec3) -> i32 {
    (pos1.x - pos2.x).abs() + (pos1.y - pos2.y).abs() + (pos1.z - pos2.z).abs()
}

pub fn euclidean_distance(pos1: IVec3, pos2: IVec3) -> i32 {
    pos1.distance_squared(pos2)
}
