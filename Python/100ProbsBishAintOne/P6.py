import math

def Q(D, C=50, H=30):
    return math.floor(math.sqrt((2 * C * D) // H))

D = input('CSV numbers: ').split(',')

D = [int(item) for item in D]

sol = []

for d in D:
    sol.append(Q(d))

print(','.join([str(_) for _ in sol]))