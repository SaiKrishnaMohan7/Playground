export default function bs_list(haystack: number[], needle: number): boolean {
  let low = 0;
  let high = haystack.length;
  let found = false;

  while (low < high) {
    let mid = Math.floor(low + ((high - low) / 2)); // Check the note in Obsidian today's note for details: This method to find mean is used here because for large arrays, the addition might result in a number that is greater than than the max limit of what a 32 bit register can hold
    let valueAtMid = haystack[mid];

    if (valueAtMid === needle) {
      found = true;
      break;
    } else if (valueAtMid > needle) {
      high = mid;
    } else {
      low = mid + 1; // as we have alredy seen the mid!
    }
  }

  return found;
}