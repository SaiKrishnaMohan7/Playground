// find the max windowSize that has a substring with non-repeating characters

// Time: O(n); Space: O(K) (K <= N)
const non_repeat_substring = function(str) {
  let maxLength = 0;
  let windowStart = 0;
  let charIndexMap = new Map();
  let rightChar = '';

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    rightChar = str[windowEnd];

    // if the map already contains the 'rightChar', shrink the window from the beginning so that
    // we have only one occurrence of 'rightChar'
    if (charIndexMap.has(rightChar)) {
      // if the rightChar is already there, then move windowStart to AFTER the index of rightChar
      windowStart = Math.max(windowStart, charIndexMap.get(rightChar) + 1);
    } 
    charIndexMap.set(rightChar, windowEnd);

    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
};
