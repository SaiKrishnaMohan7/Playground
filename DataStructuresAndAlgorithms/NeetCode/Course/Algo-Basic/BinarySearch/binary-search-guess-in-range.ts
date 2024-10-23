// https://leetcode.com/problems/guess-number-higher-or-lower/description/

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */


function guessNumber(n: number): number {
  let left = 1; // Start from 1, not 0
  let right = n;

  while (left <= right) {
      let mid = Math.floor(left + (right - left) / 2); // Ensure mid is an integer
      let result = guess(mid);

      if (result === 0) {
          return mid;
      }
      if (result === -1) {
          // guess is higher than what has been picked, so answer should be in the LEFT half
          right = mid - 1;
      } else {
          // guess is lower than what was picked, so answer should be in the RIGHT half
          left = mid + 1;
      }
  }

  return -1;
};