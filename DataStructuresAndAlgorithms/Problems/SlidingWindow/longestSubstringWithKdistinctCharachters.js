// Find the length (max; windowSize!) of the sub string when number of distinct characters (just like sum is given find window) given

// Time: O(n); Space: O(K) since we store K + 1 characters in the Map
function longestSubstringWithKdistinctCharacters(str, k) {
  let maxLength = 0;
  let charFreq = new Map();
  let windowStart = 0;
  let rightChar = '';
  let leftChar = '';

  for (let windowEnd = 0; windowEnd <= str.length; windowEnd++) {
    rightChar = str[windowEnd];

    if (!charFreq.has(rightChar)) {
      charFreq.set(rightChar, 0);
    }
    charFreq.set(rightChar, charFreq.get(rightChar) + 1);

    while(charFreq.size > k) {
      leftChar = str[windowStart];
      charFreq.set(leftChar, charFreq.get(leftChar) - 1);

      if (charFreq.get(leftChar) === 0) {
        charFreq.delete(leftChar);
      }
      windowStart += 1;
    }

    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
}

// First, we will insert characters from the beginning of the string until we have ‘K’ distinct characters in the HashMap.
// These characters will constitute our sliding window. We are asked to find the longest such window having no more than ‘K’ distinct characters. We will remember the length of this window as the longest window so far.
// After this, we will keep adding one character in the sliding window (i.e. slide the window ahead), in a stepwise fashion.
// In each step, we will try to shrink the window from the beginning if the count of distinct characters in the HashMap is larger than ‘K’. We will shrink the window until we have no more than ‘K’ distinct characters in the HashMap. This is needed as we intend to find the longest window.
// While shrinking, we’ll decrement the frequency of the character going out of the window and remove it from the HashMap if its frequency becomes zero.
// At the end of each step, we’ll check if the current window length is the longest so far, and if so, remember its length.

/**
 * Similar problems:
 * Given an array of characters where each character represents a fruit tree, you are given two baskets and your goal is to put maximum number of fruits in each basket. The only restriction is that each basket can have only one type of fruit.

You can start with any tree, but once you have started you can’t skip a tree. You will pick one fruit from each tree until you cannot, i.e., you will stop when you have to pick from a third fruit type.

Write a function to return the maximum number of fruits in both the baskets.

Ans: It is the same as the above function with k = 2
 */