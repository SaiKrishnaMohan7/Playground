// https://leetcode.com/problems/two-sum/
// https://github.com/SaiKrishnaMohan7/Playground/blob/d9e94c5543a4d63570a3f9d4f2c20dfbef02594a/DataStructuresAndAlgorithms/Problems/TwoPointers/findPairWithTargetSumFromSortedArray.js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * IDEA: Build a hashmap of array values
 *  Check if target - currentArrayValue exists in the hashmap i.e. does it exist in the array?
 *  yes -> push the current index and and the value from hashmap into array
 *  no -> set arrayValue as key and index as value
 *
 * ===> The array is unsorted we can use this; 2 pointers as the decision to move the right and left pointers wouldn't be the best
 * ===> Good idea to ask interview man if array sorted
 */
// Time: O(n), Space: O(n)
var twoSum = function (nums, target) {
  let indices = [];
  let arrayValuesVisitedToIdxMap = {};

  for (let index = 0; index < nums.length; index++) {
    const currentValue = nums[index];
    const difference = target - currentValue;
    if (difference in arrayValuesVisitedToIdxMap) {
      indices.push(arrayValuesVisitedToIdxMap[difference], index);
      return indices;
    }
    arrayValuesVisitedToIdxMap[currentValue] = index;
  }
};

twoSum([2, 7, 11, 15], 9);
