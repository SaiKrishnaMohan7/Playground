// https://leetcode.com/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let left = 0;
  let right = 1;
  let indices = [];

  while (left < nums.length && right < nums.length) {
    if (nums[left] + nums[right] == target) {
      indices.push(left, right);
      return indices;
    }
    left++;
    right++;
  }
  return indices;
};

twoSum([2, 7, 11, 15], 9);
