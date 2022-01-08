def calc(expr):
    if not expr:
        return 0
    # split into tokens, there will be spaces
    tokens = expr.split(' ')
    operations = {
        '+': (lambda x, y: x + y),
        '-': (lambda x, y: x - y),
        '/': (lambda x, y: x / y),
        '*': (lambda x, y: x * y)
    }
    
    stack = list()
    
    for token in tokens:
        if token in operations:
            a = stack.pop()
            b = stack.pop()
            rst = operations[token](a, b)
            stack.append(rst)
        elif type(token) == int:
            stack.append(int(token))
        else:
            stack.append(float(token))
        
    return stack.pop()