/**
 * init Stack
 * Build a map, helps with what 'type' of bracket it is and its orientation
 * Process each bracket
 * If we encounter an opening bracket, we simply push it onto the stack.
 * This means we will process it later, let us simply move onto the sub-expression ahead.
 *
 * If we encounter a closing bracket, then we check the element on top of the stack.
 * If the element at the top of the stack is an opening bracket of the same type, then we pop it off the stack and continue processing.
 * Else, this implies an invalid expression.
 *
 * In the end, if we are left with a stack still having elements, then this implies an invalid expression.
 */

// This solution is better than that garbage I had here before
// solution by @bradmcevilly, leetcode
var isBalanced = function (s) {
    let closeMap = {
        ")": "(",
        "}": "{",
        "]": "[",
    };
    let charStack = [];

    // validate input
    if (s === null || s === undefined) return false;

    for (var i = 0; i < s.length; i++) {
    let curChar = s.charAt(i);
    let topElement;

    if (closeMap[curChar] !== undefined) {
            topElement = charStack.length === 0 ? "#" : charStack.pop();

            if (topElement !== closeMap[curChar]) {
            return false;
            }
        } else {
            charStack.push(curChar);
        }
    }

    return charStack.length === 0;
};

// console.log(isBalanced('(]'));
