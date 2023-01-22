// leetcode 128: https://leetcode.com/problems/longest-consecutive-sequence/

/**
 * @param {number[]} nums
 * @return {number}
 */
// Time: O(n) Space: O(n) as we are creating another ds
var longestConsecutive = function(nums) {
  // Build out a map of nums array
  let numsValueToIdxMap = new Map();

  for (let i = 0; i < nums.length; ++i) {
    let num = nums[i];
    if (!numsValueToIdxMap.has(num)) {
      numsValueToIdxMap.set(num, i);
    }
  }

  let longest = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const leftNeighbor = num - 1; // start of a sequence

    // if leftNeighbor is not in array that means num is the start of the seq
    if (!numsValueToIdxMap.has(leftNeighbor)) {
      let length = 0;
      // If the consecutive right neighbors exist in the map increase length and keep checking for the next in seq
      while(numsValueToIdxMap.has(num + length)) {
        // console.log('num is the start of seq are right neighbors present', length + leftNeighbor);
        ++length;
      }
      longest = Math.max(length, longest);
    }
  }

  return longest;
};

console.log(longestConsecutive([9,1,4,7,3,-1,0,5,8,-1,6]));