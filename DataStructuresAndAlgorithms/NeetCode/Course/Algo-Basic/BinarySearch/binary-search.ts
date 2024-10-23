// https://leetcode.com/problems/binary-search/description

function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while(left <= right) {
      let mid = Math.floor(left + (right - left)/2); // prevent integer overflow for big arrays

      if (nums[mid] === target){
          return mid;
      }
      if (nums[mid] < target) {
          left = mid + 1;
      }
      if (nums[mid] > target) {
          right = mid - 1
      }
  }

  return -1;
};