// LeetCode 271: https://www.lintcode.com/problem/659/ encode and decode strings
function encode(strArr) {
  let strArrToEncode = strArr;
  let encodedStr = '';
  let delimiter = '%'; // The delimiter chosen could be a part of the string

  for (let i = 0; i < strArrToEncode.length; ++i ) {
    let str = strArrToEncode[i];
    let strLength = str.length;
    encodedStr = `${encodedStr}${strLength}${delimiter}${str}`;
  }

  return encodedStr;
}

console.log(decode(encode(['lint', 'shint', 'mint'])));

function decode(encodedStr) {
  let strToDecode = encodedStr;
  let result = [];
  let i = 0;
  let delimiter = '%';

  while (i < strToDecode.length) {
    let j = i;

    while (strToDecode[j] !== delimiter) {
      ++j;
    }
    let strLength = parseInt(strToDecode.slice(i, j));
    let beginingIdxOfStr = j + 1;
    let endingIdxOfStr = beginingIdxOfStr + strLength;
    let str = strToDecode.slice(beginingIdxOfStr, endingIdxOfStr);
    result.push(str);

    i = endingIdxOfStr;
  }

  return result;
}