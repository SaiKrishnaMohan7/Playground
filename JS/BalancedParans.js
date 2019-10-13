const isBalanced = (str) => {
    if(str.length <= 1)
        return false;

    let stack = [];
    let opening = ['{', '[', '('];
    let closing = ['}', ']', ')'];
    let matching, ch;

    for(let i = 0; i < str.length; i++){
        ch = str[i];

        if (closing.indexOf(ch) > -1){
            matching = opening[closing.indexOf(ch)];
            if(stack.length === 0 || (stack.pop() !== matching)){
                return false;
            }
        } else {
            stack.push(ch);
        }
    }

    return stack.length === 0;
};

console.log(isBalanced('{}{'));