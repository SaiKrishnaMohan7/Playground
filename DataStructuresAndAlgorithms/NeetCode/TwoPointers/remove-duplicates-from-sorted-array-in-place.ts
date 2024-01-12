// leetcode 26: https://leetcode.com/problems/remove-duplicates-from-sorted-array/

function removeDuplicates(nums: number[]): number {
  let left = 1;
  let right = 1;

  while (right < nums.length) {
    let rightVal = nums[right];
    let leftVal = nums[right - 1];

    if (leftVal !== rightVal) {
      nums[left] = rightVal;
      left++;
    }
    right++;
  }

  return left;
}
