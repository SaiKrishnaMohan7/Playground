// https://leetcode.com/problems/top-k-frequent-elements
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 *
 * IDEA:
 *  Use array indeces as count and store the numbers from nums that match the count under
 *  those indeces in an array. Bucket sort concept used.
 *
 * Time and Space O(n)
 */
var topKFrequent = function(nums, k) {
  // Create map to count numbers; array elem as key and count as value
  const frequencyMap = {};
  // Create the buckets with length 1 greater than input arr length, as we are using indices
  // to keep track of count and if nums is length 6, it is possible that an element may repeat 6 times
  // and if we created bucket of the same length as input array (0 to 5 indices) then we won't be able to
  // count the element repeating 6 times!
  const bucket = Array.from({ length: nums.length + 1 }, () => []); // [[], [], [],...,[]]
  const result = [];

  // Populate the map by counting the numbers; { num: count }
  for (let num of nums) {
    frequencyMap[num] = frequencyMap[num] ? frequencyMap[num] + 1 : 1;
  }

  // Fill the buckets with elements that match the count (indices are count)
  for (let num in frequencyMap) {
    bucket[frequencyMap[num]].push(num);
  }

  // Since we want K MOST FREQUENT, we start looping from behind
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i].length > 0) {
      bucket[i].forEach(num => result.push(num));

      if (result.length == k) {
          return result;
      }
    }
  }
};