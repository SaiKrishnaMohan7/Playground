// https://leetcode.com/problems/remove-duplicates-from-sorted-array/

/**
 * @param {number[]} nums
 * @return {number}
 */

var removeDuplicates = function(nums) {
  // input check
  if (!nums || nums.length === 0) {
    return 0;
  }

  let index = 0;
  let nextIndex = 1

  while (nextIndex < nums.length) {
    if (nums[index] !== nums[nextIndex]) {
        index ++;
        nextIndex ++;
    } else {
        nums.splice(index, 1);
    }
  }

  return nums.length;
};

// console.log(removeDuplicates([1, 1, 2, 2, 3, 4,5,6,6,6,7,7,8,8,9,9]));

/**
 * Two pointers, if they are not equal increment else splice the previous index
 * don't move pointers as the elements will shift
 *
 * This question on LC is messy. Test cases are garbage.
 */