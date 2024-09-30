// 2677. Chunk Array https://leetcode.com/problems/chunk-array/

type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function chunk(arr: Obj[], size: number): Obj[][] {
    let chunks: Obj[][] = [];

    for(let i = 0; i < arr.length; i++) {
      let chunk = arr.slice(i, i + size);
      chunks.push(chunk);
      i = i + (size - 1);
    }

    return chunks;
};