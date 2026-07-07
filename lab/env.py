import random

sum = 0
count = 1000

for _ in range(count):
    r = random.random()
    t = -90.0 + 150.0 * (r ** 0.4286)
    sum += t

print(sum / count)