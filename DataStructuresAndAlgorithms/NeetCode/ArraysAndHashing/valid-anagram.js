// https://leetcode.com/problems/valid-anagram/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// Time: O(s+t) Space: O(s+t); sort and compare will be shorter but depending on the sorting algo Time maybe O(n^2) and maybe O(1) space
// Another method would be to str.split('').sort().join('') and then see if they are equal
var isAnagram = function (s, t) {
  const sMap = {};
  const tMap = {};

  if (s.length !== t.length) {
    return false;
  }
  for (let i = 0; i < s.length; i++) {
    if (sMap[s[i]]) {
      sMap[s[i]] += 1;
    } else {
      sMap[s[i]] = 1;
    }
    if (tMap[t[i]]) {
      tMap[t[i]] += 1;
    } else {
      tMap[t[i]] = 1;
    }
  }

  const sKeys = Object.keys(sMap);
  ISanagram = false;
  for (let i = 0; i < sKeys.length; i++) {
    if (sMap[sKeys[i]] !== tMap[sKeys[i]]) {
      return ISanagram;
    }
  }
  return !ISanagram;
};

isAnagram("car", "rat");
// isAnagram("anagram", "nagaram");
