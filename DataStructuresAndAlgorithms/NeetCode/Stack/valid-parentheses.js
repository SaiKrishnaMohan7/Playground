// leetcode 20: https://leetcode.com/problems/valid-parentheses/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let closeToOpenMap = {
    '}': '{',
    ']': '[',
    ')': '(',
  };
  let stack = [];

  for (char of s) {
    if (!closeToOpenMap[char]) {
      stack.push(char);
      continue;
    }
    if (stack[stack.length - 1] === closeToOpenMap[char]) {
      stack.pop();
      continue;
    }

    return false;
  }

  return stack.length === 0;
};
