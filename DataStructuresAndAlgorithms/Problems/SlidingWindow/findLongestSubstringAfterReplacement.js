// find the max windowSize that has a substring with repeating characters after replacing maximum 2 non-repeating characters

// Time: O(n); Space: O(1)
const length_of_longest_substring = function(str, k) {
  let windowStart = 0;
  let maxLength = 0;
  let charFreq = new Map();
  let maxRepeatLetterCount = 0;
  let rightChar, leftChar = '';

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    rightChar = str[windowEnd];

    if(!charFreq.has(rightChar)) {
      charFreq.set(rightChar, 0);
    }
    charFreq.set(rightChar, charFreq.get(rightChar) + 1);

    maxRepeatLetterCount = Math.max(maxRepeatLetterCount, charFreq.get(rightChar));

    // if the number of non-repeating characters are greater than the allowed limit k for
    // replacing characters, shrink the window
    if ((windowEnd - windowStart + 1 - maxRepeatLetterCount) > k) {
      leftChar = str[windowStart];
      charFreq.set(leftChar, charFreq.get(leftChar) - 1);
      windowStart += 1;
    }
    
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
};

const findLongestSubArrayOnesAfterReplacement = function(arr, k) {
  let maxLength = 0;
  let windowStart = 0;
  let maxOnesCount = 0;

  for(let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    if (arr[windowEnd] === 1) {
      maxOnesCount += 1;
    }

    if ((windowEnd - windowStart + 1 - maxOnesCount) > k) {
      if (arr[windowStart] === 1) {
        maxOnesCount -= 1;
      }
      windowStart += 1;
    }

    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
};
