// https://leetcode.com/problems/palindrome-number/
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  // Type cast
  let strX = String(x);
  // String to Array to String
  let reversed = strX.split('').reverse().join('')
  // Could be implemented using a Stack if that is a constraint
  if (reversed === strX) {
      return true;
  }

  return false;
};

/**
 * Stack algo
 * convert to Array
 * Iterate and push into stack
 * While Stack not empty, pop and join
 * Compare if same, true, if not false
 */