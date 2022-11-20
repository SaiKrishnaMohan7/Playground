function sorter(arr: number[], lo: number, hi: number): void {
  // base case
  if (lo >= hi) {
    return;
  }

  const pivotIdx = partition(arr, lo, hi);

  // Recusive case
  sorter(arr, lo, pivotIdx - 1);
  sorter(arr, pivotIdx + 1, hi);
}

// This function figures out the pivot and weakly sorts the array, moves the pivot to a
// particular index
function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi]; // randomly picked this

  let idx = lo - 1; // this where we will place the pivot, could be named pivotIndex

  // Walk from to lo to hi but excluding hi
  for (let i = lo; i < hi; ++i) {
    // Find every value that is <= pivot and place it to the left of the pivot
    if(arr[i] <= pivot) {
      // get to lo, since we will be moving the value to this index
      idx++;
      const tmp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = tmp;
    }
  }

  // if we did not find any value lower than the pivot we incremnet the idx to lo
  idx++;
  arr[hi] = arr[idx];
  arr[idx] = pivot;

  return idx;
}

// Everything to teh left of the pivot should <= and everything to teh right should be > pivot
export default function quick_sort(arr: number[]): void {
  // /Quick sort and partitioning (pivot finder)

  sorter(arr, 0, arr.length - 1); // hi is inclusive, weird
}