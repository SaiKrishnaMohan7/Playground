// https://leetcode.com/problems/add-binary/submissions/
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  const binA = parseInt(a, 2);
  const binB = parseInt(b, 2);

  sum = binA + binB;

  return sum.toString(2);
};