const find_string_anagrams = function(str, pattern) {
  const resultIndices = [];
  let windowStart = 0;
  let matched = 0;
  let leftChar, rightChar, ch = '';
  let patternCharFreq = {};

  // pattern into a map
  for (let i = 0; i < pattern.length; i++) {
    ch = pattern[i];
    if (!(ch in patternCharFreq)) {
      patternCharFreq[ch] = 0;
    }
    patternCharFreq[ch] += 1;
  }

  // Slide window through given string
  for (let windowEnd = 0; windowEnd < str.length; windowEnd ++) {
    rightChar = str[windowEnd];

    // if rightChar is in the map, reduce the freq of the char
    if(rightChar in patternCharFreq) {
      patternCharFreq[rightChar] -= 1;
      // if the freq of char after reducing is 0 that means it is a match
      if (patternCharFreq[rightChar] === 0) {
        matched += 1;
      }
    }
    // if the matched is same as the pattern (Map size) that means that anagram exists! So push the index in to the arr
    if (matched === Object.keys(patternCharFreq).length) {
      // since we need to know where the anagram starts!
      resultIndices.push(windowStart);
    }

    // shrink the window
    // Check where windowEnd is, if it the index that it is at > the pattern length, start window reduction
    if (windowEnd >= pattern.length - 1) {
      leftChar = str[windowStart];
      // shrink the window by moving windowStart to the right
      windowStart += 1;
      // if leftChar is in the map, that means it is leaving the window so bump up its freq
      if (leftChar in patternCharFreq) {
        if (patternCharFreq[leftChar] === 0) {
          // before putting the character back, decrement the matched count
          matched -= 1;
        }
        patternCharFreq[leftChar] += 1;
      }
    }
  }

  return resultIndices;
};

console.log(find_string_anagrams('ppqp', 'pq'));
console.log(find_string_anagrams('abbcabc', 'abc'));