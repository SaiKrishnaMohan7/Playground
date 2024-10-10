// https://leetcode.com/problems/concatenation-of-array/description/

function getConcatenation(nums: number[]): number[] {
  return [...nums, ...nums]
};

function getConcatenation2(nums: number[]): number[] {
  let ans:number[] = [];
  for (let i = 0; i < nums.length * 2; i++) {
      ans.push(nums[i % nums.length]);
  }

  return ans;
};