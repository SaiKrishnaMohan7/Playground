function firstNonRepeatingChar(str) {
  const charArr = str.split('');
  const countMap = new Map();
  let prevCount;
  let firstNonRepeatingChar;

  for (let i = 0; i < charArr.length; i++) {
    if (countMap.has(charArr[i])) {
      prevCount = countMap.get(charArr[i]);
      countMap.set(charArr[i], prevCount + 1);
    } else {
      countMap.set(charArr[i], 1);
    }
  }

  // forEach dosen't return, can't short circuit execution.
  // Would have to use countMap.keys, loop and then return
  // O(mn)
  countMap.forEach((value, key) => {
    console.log(`ff: ${value, key}`);
    firstNonRepeatingChar = value === 1 ? key : 'No characters found';
  });


  return firstNonRepeatingChar;
};

console.log(firstNonRepeatingChar('a green apple'));