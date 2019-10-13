X = int(input('Enter X: '))
Y = int(input('Enter Y: '))

matrix = [[0 for a in range(Y)] for b in range(X)]

for i in range(X):
    for j in range(Y):
        matrix[i][j] = i * j

print(matrix)