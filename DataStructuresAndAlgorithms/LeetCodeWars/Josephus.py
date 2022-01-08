def josephus(items,k):
    if type(items) is not list:
        return 'A list should be passed'
        
    kill = list()
    k -= 1
    index = k
    
    while len(items) > 1:

        kill.append(items.pop(index))
        index = (index + k) % len(items)
    if items:
        kill.append(items.pop())
    
    return kill

# Fails for this
print(josephus([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],40))