// leetcode 167: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  let result = [];
  if (!numbers.length) {
    return result;
  }

  let left = 0;
  let right = numbers.length - 1;

  while (left < numbers.length && right >= 0) {
    let currentSum = numbers[left] + numbers[right];
    if (currentSum === target) {
      result.push(left + 1, right + 1); // since the pbm as of 30/1/2023 says 1 indexed arr

      break;
    } else if (currentSum < target) {
      ++left;
    } else {
      --right;
    }
  }

  return result;
};