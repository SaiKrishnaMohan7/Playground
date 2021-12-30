const Stack = require('../Implemenations/Stack_noArray');

const stack = new Stack();

function stringReversal(str) {
  let reverse = '';
  const charArr = str.split('');

  if (str.length === 0 || !str) {
    return '';
  }

  // populate stack O(n)
  charArr.forEach(element => {
    stack.push(element);
  });

  // Strings are immujtable in JS, so a new object is created in memory every time
  // Java has StringBuffer class
  // https://jsperf.com/string-concat-without-sringbuilder/7 concatenation is fastest in JS
  while (!stack.isEmpty()) {
    reverse += stack.pop();
  }

  return reverse;

};

// console.log(stringReversal('abcd'));
