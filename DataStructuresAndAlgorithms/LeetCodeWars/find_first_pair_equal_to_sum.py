def sum_pairs(ints, s):
    length = len(ints)
    net = s
    pair = list()
    
    for i in range(0, length):
        for j in range(i + 1, length):
            if ints[i] + ints[j] == net:
                return ints[i: j+1]
    return None