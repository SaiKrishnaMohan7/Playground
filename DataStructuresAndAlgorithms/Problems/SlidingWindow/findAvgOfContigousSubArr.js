// Find Avg when window size is given; Length of the sub-array is given average or sum is to be found

// Brute force method: For every element, we calcluate the sum the next k elements so O(n * k)
function findAvgOfSubArrays(arr, k) {
  let result = [];
  let sum = 0.0;

  // O(n)
  for (let i = 0; i < arr.length - k + 1  ; i++) {
    // O(k)
    for (let j = i; j < i + k; j++) {
      sum = sum + arr[j];
    }

    result.push(sum / k);
  }

  return result;
}

const result = findAvgOfSubArrays([1, 3, 2, 6, -1, 4, 1, 8, 2], 5);
console.log(`Averages of subarrays of size K: ${result}`);

// Efficient method: re-use the sum! We can subtract the element (from sum) that is leaving the k size window and add the number that is entering the window; O(n)
function findAvgOfSubArrEfficient(arr, k) {
  const result = [];
  let windowSum = 0.0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    // add the next element
    windowSum = windowSum + arr[windowEnd];

    // slide the window; No need to slide window if the limit is not reached i.e. the window is not full yet!
    if (windowEnd >= k - 1) {
      result.push(windowSum / k);
      // Subtract the leaving element
      windowSum = windowSum - arr[windowStart];
      // slide the window ahead
      windowStart = windowStart + 1;
    }
  }

  return result;
}

const resultEffixient = findAvgOfSubArrEfficient([1, 3, 2, 6, -1, 4, 1, 8, 2], 5);
console.log(`Averages of subarrays of size K: ${resultEffixient}`);


// 1. Subtract the element going out of the sliding window i.e., subtract the first element of the window.
// 2. Add the new element getting included in the sliding window i.e., the element coming right after the end of the window.