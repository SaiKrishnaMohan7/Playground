function insertionSort(nums:number[]): number[] {
  for(let i = 1; i < nums.length; i++) {
    let current = nums[i];
    let j = i - 1;

    // Shift elements of arr[0..i-1], that are greater than current, to one position ahead
    while (j >= 0 && nums[j] > current) {
      nums[j + 1] = nums[j];
      j--;
    }

    // Place current elt to right position
    nums[j + 1] = current;
  }

  return nums;
}