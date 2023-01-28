// leetcode 125: https://leetcode.com/problems/valid-palindrome/

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  const isAlphanumeric = char => /[a-zA-Z0-9]/.test(char);

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    const leftChar = s[left];
    const rightChar = s[right];

    // skip char if non-alphanumeric
    if (!isAlphanumeric(leftChar)) {
      left++;
  } else if (!isAlphanumeric(rightChar)) {
      right--;
  } else {
      // compare letters
      if (leftChar.toLowerCase() != rightChar.toLowerCase()) {
        return false;
      }
      left++;
      right--;
    }
  }

  return true;
};

console.log(isPalindrome("A man, a plan, a canal: Panama"));