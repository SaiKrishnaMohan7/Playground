// leetcode 42: https://leetcode.com/problems/trapping-rain-water/

/**
 * @param {number[]} height
 * @return {number}
 */
// Time: O(n) Space: O(1)
var trap = function(height) {
  let res = 0;
  if (!height || !height.length) return res;

  let left = 0;
  let right = height.length - 1;
  let leftMax = height[left];
  let rightMax = height[right];

  while (left < right) {
    if (leftMax < rightMax) {
      ++left;
      leftMax = Math.max(leftMax, height[left]);
      res = res + (leftMax - height[left]);
    } else {
      --right;
      rightMax = Math.max(rightMax, height[right]);
      res = res + (rightMax - height[right]);
    }
  }

  return res;
};
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));