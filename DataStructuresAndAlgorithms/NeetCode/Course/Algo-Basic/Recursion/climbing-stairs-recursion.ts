// https://leetcode.com/problems/climbing-stairs/

function climbStairs(n: number): number {
  if (n <= 1) {
      return n;
  }

  return climbStairs(n - 1) + climbStairs(n - 2); // fibonacci lol
};