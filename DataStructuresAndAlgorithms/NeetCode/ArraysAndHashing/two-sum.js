// https://leetcode.com/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// Time: O(n), Space: O(n)
var twoSum = function (nums, target) {
  let indices = [];
  let arrayValuesVisitedToIdxMap = {};
  // Build a hashmap of array values
    // Check if target - currentArrayValue exists in the hashmap i.e. does it exist in the array?
    // yes -> push the current index and and the value from hashmap into array
    // no -> set arrayValue as key and index as value
  for (let index = 0; index < nums.length; index++) {
    const currentValue = nums[index];
    const difference = target - currentValue;
    if (arrayValuesVisitedToIdxMap[difference]) {
      indices.push(arrayValuesVisitedToIdxMap[difference], index);
      return indices;
    }
    arrayValuesVisitedToIdxMap[currentValue] = index;
  }
};

twoSum([2, 7, 11, 15], 9);
