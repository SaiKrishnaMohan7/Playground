// Find the (min) length of the window (sub-array) when the sum is given

// Time: O(n) since while processes all elements once; Space: O(1)
function findSmallestSubArrayWithAGivenSum(arr, givenSum) {
  let minLength = Infinity;
  let windowStart = 0;
  let windowSum = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    // Start adding from the beginning till the sum of elements is >= givenSum
    windowSum += arr[windowEnd];

    // Shrink the window size till this condition is not true
    while (windowSum >= givenSum) {
      // Figure out the smallest of current value of minLength (smallest window so far) and the current window size
      minLength = Math.min(minLength, windowEnd - windowStart + 1);
      // subtract the element leaving the shrinking window
      windowSum -= arr[windowStart];
      // shrink the window
      windowStart += 1;
    }
  }

  if (minLength === Infinity) {
    return 0;
  }

  return minLength;
}

console.log(`Smallest subarray length: ${findSmallestSubArrayWithAGivenSum([2, 1, 5, 2, 3, 2], 7)}`);
console.log(`Smallest subarray length: ${findSmallestSubArrayWithAGivenSum([2, 1, 5, 2, 8], 7)}`);
console.log(`Smallest subarray length: ${findSmallestSubArrayWithAGivenSum([3, 4, 1, 1, 6], 8)}`);

// 1. First, we will add-up elements from the beginning of the array until their sum becomes greater than or equal to ‘S’.
// 2. These elements will constitute our sliding window. We are asked to find the smallest such window having a sum greater than or equal to ‘S’. We will remember the length of this window as the smallest window so far.
// 3. After this, we will keep adding one element in the sliding window (i.e. slide the window ahead), in a stepwise fashion.
// 4. In each step, we will also try to shrink the window from the beginning. We will shrink the window until the window’s sum is smaller than ‘S’ again. This is needed as we intend to find the smallest window. This shrinking will also happen in multiple steps; in each step we will do two things:
// 5. Check if the current window length is the smallest so far, and if so, remember its length.
// 6. Subtract the first element of the window from the running sum to shrink the sliding window.