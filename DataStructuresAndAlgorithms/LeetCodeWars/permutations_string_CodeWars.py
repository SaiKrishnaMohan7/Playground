from itertools import permutations as perm

def permutations(string):
    if not string:
        return 'Empty String'

    return set([''.join(p) for p in perm(string)])