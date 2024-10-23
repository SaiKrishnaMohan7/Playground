// https://leetcode.com/problems/first-bad-version/description/

/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

var solution = function(isBadVersion: any) {

  return function(n: number): number {
      let left = 1;
      let right = n;

      // Why left < right:

      // The loop continues until left equals right, which ensures that the search narrows down to a single version.
      // Using left < right prevents an infinite loop situation and converges the search to the first bad version.

      while (left < right) { // Use '<' instead of '<=' to avoid infinite loop when left and right converge
          const mid = Math.floor(left + (right - left) / 2);

          if (isBadVersion(mid)) {
              // If mid is a bad version, then the first bad version is at mid or before it
              right = mid;
          } else {
              // If mid is not a bad version, the first bad version must be after mid
              left = mid + 1;
          }
      }

      // When left == right, they both point to the first bad version
      return left;
  };
};