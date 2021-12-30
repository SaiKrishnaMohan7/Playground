// A complete garbage solution... No understanding, no natural thought
const remove_duplicates = function(arr) {
  let i = 1;
  let next = i + 1;

  while (i < arr.length) {
    if (arr[next] !== arr[i]) {
      arr[next] = arr[i];
      next += 1;
    }
    i += 1;
  }
  return next;
};

// arr => { let deDuped = [...new Set(arr)]}; The JS way