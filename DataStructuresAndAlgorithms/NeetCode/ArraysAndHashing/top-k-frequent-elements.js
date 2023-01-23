// https://leetcode.com/problems/top-k-frequent-elements
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 *
 * IDEA:
 *  Use array indeces as count and store the numbers from nums that match the count under
 *  those indeces in an array. Bucket sort concept used.
 * ALGO IMPL:
 *  Create map to count numbers; array elem as key and count as value
 *  Create the buckets with length 1 greater than input arr length, as we are using indices
 *    to keep track of count and if nums is length 6, it is possible that an element may repeat 6 times
 *    and if we created bucket of the same length as input array (0 to 5 indices) then we won't be able to
 *    count the element repeating 6 times!
 *  Populate the map by counting the numbers; { num: count }
 *  Since we want K MOST FREQUENT, we start looping from behind
 *
 * Time and Space O(n)
 */
var topKFrequent = function(nums, k) {
  const freqMap = new Map();
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  const result = [];

  for(let i = 0; i < nums.length; ++i) {
    let num = nums[i];
    if (freqMap.has(num)) {
        let count = freqMap.get(num);
        freqMap.set(num, ++count);
    } else {
        freqMap.set(num, 1);
    }
  }

  for([num, count] of freqMap) {
    const bucket = buckets[count];

    bucket.push(num);
  }

  for(let i = buckets.length - 1; i >= 0; --i) {
    const bucket = buckets[i];

    if (bucket.length > 0) {
      bucket.forEach(num => result.push(num));

      if (result.length == k) {
          return result;
      }
    }
  }

  return result;
};
console.log(topKFrequent([1,1,1,2,2,3], 2));