def F(n):
        if n == 0: return 0
        elif n == 1: return 1
        else: return F(n-1)+F(n-2)


def F():
    a,b = 0,1
    while True:
        yield a
        a, b = b, a + b