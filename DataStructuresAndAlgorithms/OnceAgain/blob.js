// Closure memoized factorial recursion
function factorial(n) {
  if (n == 0) {
    return 1;
  }
  return n * factorial(n-1);
}

function memoize(cb) {
  const cache = {};
  const fn = (n) => {
    let result;
    if (cache[n]) {
      result = cache[n];
    } else {
      cache[n] = cb(n);
      result = cache[n];
    }
    return result;
  };

  return fn;
}

const factMem = memoize(factorial);

console.log(factMem(5));
console.log(factMem(6));

// Dedupe
const isUnique = (arr) => {
  let memory = {};
  let idx = 0;
  let start = Date.now();
  while (idx < arr.length) {
    if (memory[arr[idx]]) {
      return false
    }
    memory[arr[idx]] = 'seen';
    idx++;
  }

  console.log(Date.now() - start);
  return true;
};

console.log(isUnique([1,2,3]));
console.log(isUnique([1,1,3]));

// Merge Sort
function mergeSort(nums) {
  if (nums.length < 2) {
    return nums;
  }

  const length = nums.length;
  const middle = Math.floor(length / 2);
  const left = nums.slice(0, middle);
  const right = nums.slice(middle, length);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  return stitch(sortedLeft, sortedRight);

}

function stitch(arr1, arr2) {
  const stitchedArr = [];

  while(arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      stitchedArr.push(arr1.shift()); // shift - Remove element from front
    } else {
      stitchedArr.push(arr2.shift());
    }
  }

  return stitchedArr.concat(arr1, arr2);
}