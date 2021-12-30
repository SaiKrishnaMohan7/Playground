// https://leetcode.com/problems/roman-to-integer/
/**
 * @param {string} s
 * @return {number}
 */

let romanToInteger = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
};

var romanToInt = function(s) {
  // '' split by character
  const romanNumeralArr = s.split('');

  let total = 0;
  let currentRomanNumeral;
  let currentCorrespondingValue;
  let nextRomanNumeral;
  let nextCorrespondingValue;

  for (let i = 0; i < romanNumeralArr.length; i++) {
    currentRomanNumeral = romanNumeralArr[i];
    currentCorrespondingValue = romanToInteger[currentRomanNumeral];

    nextRomanNumeral = romanNumeralArr[i + 1];
    nextCorrespondingValue = romanToInteger[nextRomanNumeral];

    // Figuring out when to subtract and when to add was the main challenge that messed me up
    // I was able to see it through till the edge case but nevertheless,
    // found this amazing explanation and this helped with the 'when to' part
    // LEGIT: https://medium.com/javascript-in-plain-english/algorithms-101-convert-roman-numerals-to-integers-in-javascript-d3aba86a43d4

    if (currentCorrespondingValue < nextCorrespondingValue) {
        total = total - currentCorrespondingValue;
    } else {
        total = total + currentCorrespondingValue;
    }
  }

  return total;
};