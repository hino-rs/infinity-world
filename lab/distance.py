import numpy as np

def manhattan(p1: np.ndarray, p2: np.ndarray) -> int:
    x1, y1, z1 = p1[0], p1[1], p1[2]
    x2, y2, z2 = p2[0], p2[1], p2[2]
    return abs(x1 - x2) + abs(y1 - y2) + abs(z1 - z2)

def euclidean(p1: np.ndarray, p2: np.ndarray) -> int:
    x1, y1, z1 = p1[0], p1[1], p1[2]
    x2, y2, z2 = p2[0], p2[1], p2[2]

    return np.sqrt(((x2 - x1)**2) + (y2 - y1)**2 + (z2 - z1)**2)

o = np.array([0, 0, 0])
p = np.array([1, 1, 1])

for i in range(100):
    m = manhattan(o, p * i)
    e = euclidean(o, p * i)
    print("マンハッタン:", m)
    print("ユークリッド:", e)
