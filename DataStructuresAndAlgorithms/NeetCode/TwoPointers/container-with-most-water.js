// leetcode 11: https://leetcode.com/problems/container-with-most-water/
/**
 * @param {number[]} height
 * @return {number}
 */
// Find maxArea between two points in the given array
// time: O(n) space: O(1)
var maxArea = function(height) {
  let res = 0;

  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    // x-axis is the breadth and y-axis the height
    let currArea = (right - left) * Math.min(height[left], height[right]); // as the area will be bounded by the height! Think x and y axis in a graph
    res = Math.max(res, currArea);

    if (height[left] < height[right]) {
      ++left;
    } else {
      // right height is larger or left and right height are the same
      --right;
    }
  }

  return res;
};