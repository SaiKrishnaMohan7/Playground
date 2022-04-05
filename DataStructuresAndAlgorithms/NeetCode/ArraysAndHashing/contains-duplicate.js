// https://leetcode.com/problems/contains-duplicate/

// Time: O(n); Space: O(n)
let containsDuplicate = function (nums) {
  const freqMap = {};
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    if (freqMap[item]) {
      return true;
    } else if (freqMap[item]) {
      freqMap[item] += 1;
    } else {
      freqMap[item] = 1;
    }
  }
  return false;
};

containsDuplicate([1, 2, 3, 1]);
