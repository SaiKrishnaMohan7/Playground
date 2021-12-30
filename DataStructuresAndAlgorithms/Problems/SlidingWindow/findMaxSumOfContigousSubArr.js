// Time Complexity O(N), Space O(1)
function findMaxSumOfContiguosSubArr(arr, k) {
  let windowStart = 0;
  let windowSum = 0.0;
  let maxSum = 0.0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum = windowSum + arr[windowEnd];

    if (windowEnd >= k - 1) {
      // FInd the max of the two
      maxSum = Math.max(windowSum, maxSum);
      // Subtract element leaving the windpw
      windowSum = windowSum - arr[windowStart]
      // Move the window ahead
      windowStart = windowStart + 1;
    }
  }

  return maxSum;
}

console.log(`Maximum sum of a subarray of size K: ${findMaxSumOfContiguosSubArr([2, 1, 5, 1, 3, 2], 3)}`);
console.log(`Maximum sum of a subarray of size K: ${findMaxSumOfContiguosSubArr([2, 3, 4, 1, 5]), 2}`);