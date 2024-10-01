// https://leetcode.com/problems/evaluate-reverse-polish-notation/


function evalRPN(tokens: string[]): number {
  const operations = {"+": 'add', "-": 'sub', "*": 'mul', "/": 'div'};
  const stack:number[] = [];
  // let tosIdx = stack.length - 1;

  for (let token of tokens) {
      if (!operations[token]) {
      // Push operands onto stack
          stack.push(Number(token));
      } else {
          const operation = operations[token];
          const rightOperand = stack.pop();
          const leftOperand = stack.pop();
          const res = calculate(operation, rightOperand, leftOperand);
          stack.push(res);
      }
      // tosIdx = stack.length - 1; // Should reacalculate this
  }

  return stack.pop()!;
  // return stack[tosIdx]; // return stack.pop() after all the processing is done the res will be at TOS
};

function calculate(operation, rightOperand, leftOperand) {
  switch(operation) { // mapping had to be fixed
      case 'add':
          return rightOperand + leftOperand;
      case 'mul':
          return rightOperand * leftOperand;
      case 'div':
          return Math.trunc(leftOperand / rightOperand); // Math.trunc to handle integer division
      case 'sub':
          return leftOperand - rightOperand;
  }
}