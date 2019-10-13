def is_balanced(string):
    if len(string) <= 1:
        return False
    
    opening = ['{', '[', '(']
    closing = ['}', ']', ')']
    stack = []

    for i in len(string):
        ch = string[i]
        if closing.index(ch) > -1:
            matching = opening[closing.index(ch)]
            if len(stack) == 0 or matching != stack.pop():
                return False
        else:
            stack.append(ch)
    
    return len(stack) == 0