const pair_with_targetsum = function(arr, target_sum) {
  const resultIndices = [];
  const arrLen = arr.length;
  let start = 0;
  let end = arrLen - 1;

  while (start < arrLen && end >= 0) {
    if (arr[start] + arr[end] === target_sum) {
      resultIndices.push(start);
      resultIndices.push(end);

      return resultIndices;
    } else if (arr[start] + arr[end] < target_sum) {
      // if sum is less then increase the start pointer since it is a sorted array
      start += 1;
    } else {
      // decrement the endpointer since the sum is large
      end -= 1;
    }
  }

  return resultIndices;
}


// If the sum of the two numbers pointed by the two pointers is greater than the target sum,
// this means that we need a pair with a smaller sum. So, to try more pairs, we can decrement the end-pointer.

// If the sum of the two numbers pointed by the two pointers is smaller than the target sum,
// this means that we need a pair with a larger sum. So, to try more pairs, we can increment the start-pointer.

/** Alternative Approach 1
 * function pair_with_target_sum(arr, targetSum) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === targetSum) {
      return [left, right];
    }

    if (targetSum > currentSum) {
      left += 1; // we need a pair with a bigger sum
    } else {
      right -= 1; // we need a pair with a smaller sum
    }
  }
  return [-1, -1];
}

// Search for ‘Y’ (which is equivalent to “Target - XTarget−X”) in the HashTable.
If it is there, we have found the required pair.
// Otherwise, insert “X” in the HashTable, so that we can search it for the later numbers.

  * Alternative Approach 2
  function pair_with_target_sum(arr, targetSum) {
  const nums = {}; // to store numbers and their indices
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    if (targetSum - num in nums) {
      return [nums[targetSum - num], i];
    }
    nums[arr[i]] = i;
  }
  return [-1, -1];
}
 */