// https://leetcode.com/problems/group-anagrams/
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// Time: O(m * nlogn) n - str len, m - array len; Space: O(m + n)
var groupAnagrams = function(strs) {
  const map = {};

  for (const str of strs) { // Note: for...in (loops over properties) should not be used to iterate over an Array where the index order is important.
    let sortedStr = str.split('').sort().join('');
    if (!map[sortedStr]) {
      map[sortedStr] = [];
    }
    map[sortedStr].push(str); // so that the first str also gets grouped!
  }

  const groupedAnagrams = Object.values(map);
  return groupedAnagrams;
};



groupAnagrams(["eat","tea","tan","ate","nat","bat"]);