const find_substring = function(str, pattern) {
  let windowStart, matched, substrStart = 0;
  let rightChar, leftChar, patternChar = '';
  let minLength = str.length + 1;
  let patternCharFreq = {};

  // pattern to js obj
  for(let i = 0; i < pattern.length; i++) {
    patternChar = pattern[i];
    
    if(!(patternChar in patternCharFreq)) {
      patternCharFreq[patternChar] = 0
    }
    patternCharFreq[patternChar] += 1;
  }

  // Slide the window
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    rightChar = str[windowEnd];

    if (rightChar in patternCharFreq) {
      patternCharFreq[rightChar] -= 1;
      if (patternCharFreq[rightChar] >= 0) {
        matched += 1;
      }
    }

    while(matched === pattern.length) {
      if (minLength > windowEnd - windowStart + 1) {
        minLength = windowEnd - windowStart + 1;
        substrStart = windowStart;
      }

      leftChar = str[windowStart];
      if (leftChar in patternCharFreq) {
        if (patternCharFreq[leftChar] === 0) {
          matched -= 1;
        }
        patternCharFreq[leftChar] += 1;
      }
    }
  }

  if (minLength > str.length) {
    return '';
  }
  return str.substring(substrStart, substrStart + minLength);
}

