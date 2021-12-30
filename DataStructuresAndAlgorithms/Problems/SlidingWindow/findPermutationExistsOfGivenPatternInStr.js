const find_permutation = function(str, pattern) {
  let matched = 0;
  let windowStart = 0;
  let patternCharFreq = {};
  let char, leftChar, rightChar = '';

  // Inser the characters of the pattern into a map
  for (let i = 0; i < pattern.length; i++) {
    char = pattern[i];

    if (!(char in patternCharFreq)) {
      patternCharFreq[char] = 0
    }
    patternCharFreq[char] += 1;
  }

  // Slide the window
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    rightChar = str[windowEnd];

    // if the right character in the string exists in the pattern map,
    // decrement the count from the pattern map
    if (rightChar in patternCharFreq) {
      patternCharFreq[rightChar] -= 1;
      // After decrement if the count is 0, increment matched
      if (patternCharFreq[rightChar] === 0) {
        matched += 1;
      }
    }

    // if matched is equal to the length of the pattern, anagram exists
    if (matched === Object.keys(patternCharFreq).length) {
      return true;
    }

    // Shrink the window
    if (windowEnd >= pattern.length - 1) {
      leftChar = str[windowStart];
      windowStart += 1;

      // if the char leaving the window exists in the map, increment its count
      if (leftChar in patternCharFreq) {
        // if the count of the leaving char is 0 then decrement matched adn increment
        // increment the count of the the char leaving the window
        if (patternCharFreq[leftChar] === 0) {
          matched -= 1;
        }
        patternCharFreq[leftChar] += 1;
      }
    }
  }

  return false;
};

console.log(`Permutation exist: ${find_permutation('odicf', 'dc')}`);
console.log(`Permutation exist: ${find_permutation('oidbcaf', 'abc')}`);
console.log(`Permutation exist: ${find_permutation('bcdxabcdy', 'bcdyabcdx')}`);
console.log(`Permutation exist: ${find_permutation('aaacb', 'abc')}`);

// Changed from Map to a JS object since debugging became an issue. The JS Map
// has some complications when we try to JSON.stringify() it. Stringification is
// not possible

// https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map/29085474#29085474