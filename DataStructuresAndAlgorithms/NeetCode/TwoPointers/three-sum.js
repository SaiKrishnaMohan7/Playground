// leetcode 15: 3sum https://leetcode.com/problems/3sum/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let result = [];
  if (!nums.length) {
    return result.push([]);
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description
  // NOTE: If compareFn is not supplied,
  // all non-undefined array elements are sorted by converting them to strings
  // and comparing strings in UTF-16 code units order.
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; ++i) {
    const num = nums[i];
    if (i > 0 && num === nums[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const currentSum = num + nums[left] + nums[right];

      if (currentSum > 0) {
        --right;
      } else if (currentSum < 0) {
        ++left;
      } else {
        result.push([num, nums[left], nums[right]]);

        ++left;
        while (nums[left] === nums[left - 1]) {
          // Since we do not want to reuse the same num
          // we keep incrementing left pointer, right will be updated in
          // the following blocks
          ++left;
        }
      }
    }
  }

  return result;
};

console.log(threeSum([-1,0,1,2,-1,-4]));