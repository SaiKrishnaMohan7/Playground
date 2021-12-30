
// https://leetcode.com/problems/reverse-integer

// Final Submission, accepted
/**
 * @param {number} x
 * @return {number}
 */

var checkOverflow = function(x) {
  return Math.pow(-2, 31) < x && x < Math.pow(2, 31) - 1;
}
var reverser = function (x) {
  let rev = 0;
  while(x != 0) {
      rev = rev * 10;
      rev = rev + x % 10;
      x = Math.floor(x / 10);
  }
  return rev;
};
var reverse = function(x) {
  let reversed = 0;
  if (x >= 0) {
      reversed = reverser(x);
      if(checkOverflow(reversed)){
        return reversed;
      }
  } else {
      let unsignedX = Math.abs(x);
      reversed = reverser(unsignedX);
      if(checkOverflow(reversed)){
        return -reversed;
      }
  }

  return 0;
};

// const MAX_INT_DIVIDED_BY_10 = Math.floor((Math.pow(2, 31) - 1)//10);
// // doing some funny stuff with the signs since your check overflow takes positive ints so we actually want this to be positive
// const MIN_INT_DIVIDED_BY_10 = Math.abs( Math.floor(Math.pow(-2, 31)//10) );

// const checkOverflow = function(rev, rem, positive) {
//     if (positive) {
//         // Check that multiplying x by 10 won't overflow
//         // i.e. the current reversed value isn't greater than (2^31 -1) // 10
//         // OR if it's equal to (2^31-1), the remainder we're adding isn't greater than the
//         // the last digit of (2^31-1) = 2147483647 -> 7
//         return rev > MAX_INT_DIVIDED_BY_10 || (rev == MAX_INT_DIVIDED_BY_10 &&  rem > 7);
//     } else {
//         // Do similar for the negative check, but verify the added value is less than the last digit of min int
//         // -2147483648 -> -8
//         return rev > MIN_INT_DIVIDED_BY_10 || (rev == MIN_INT_DIVIDED_BY_10 &&  rem < 8)
//     }
// }

// const reverser = function (x, positive) {
//     let rev = 0;
//     while(x != 0) {
//         rem = x % 10;
//         safer flow than my solution by @bshaibu
//         if (checkOverflow(rev, rem, positive) {
//             rev = rev * 10;
//             rev = rev + rem;
//             x = Math.floor(x / 10);
//     }
//     return rev;
// };