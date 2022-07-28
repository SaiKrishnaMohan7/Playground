// https://leetcode.com/problems/product-of-array-except-self
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  let product = 1;
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    result[i] = product;
    product = product * nums[i];
  }
  product = 1;
  for (let j = nums.length - 1; j >=0 ; j--) {
    result[j] = result[j] * product;
    product = product * nums[j];
  }

  return result;
};