function quickSort(nums:Array<number>): Array<number> {
  if (nums.length < 2) {
    return nums;
  }

  const pivot = nums[nums.length - 1];
  const leftOfPivot: Array<number> = [];
  const rightOfPivot: Array<number> = [];

  for(let i = 0; i < nums.length; i++) {
    if(nums[i] < pivot) {
      leftOfPivot.push(nums[i]);
    } else {
      rightOfPivot.push(nums[i]);
    }
  }

  return [...quickSort(leftOfPivot), pivot, ...quickSort(rightOfPivot)];
}