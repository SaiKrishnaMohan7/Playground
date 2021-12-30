function findOccurences (arr, num) {
  let i = 0;
  let occurences = 0;

  while (i < arr.length) {
    if (arr[i] === num) {
      occurences += 1;
    }
    i++;
  }

  return occurences;
}

// console.log(findOccurences([1,2,3,5,6,8,8], 8));
console.log(findOccurences([1,2,3,3,3,3,3,5,6,8,8], 3));