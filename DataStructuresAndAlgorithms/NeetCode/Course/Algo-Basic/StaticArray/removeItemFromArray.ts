// https://leetcode.com/problems/remove-element/

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  // input check
  if (!nums || nums.length === 0) {
      return 0;
  }

  let index = 0;

  while(nums.includes(val)) {
      index = nums.findIndex(item => item === val);
      nums.splice(index, 1);
  }

  return nums.length;
};

console.log(removeElement([3,2,2,3], 3));