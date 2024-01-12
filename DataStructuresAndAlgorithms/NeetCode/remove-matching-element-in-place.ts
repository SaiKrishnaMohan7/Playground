// https://leetcode.com/problems/remove-element/

// This is more a problem to find the number of elements in the array that are not val rather than removing them
function removeElement(nums, val) {
  let i = 0;
  let notVal = 0;

  while (i < nums.length) {
    if (nums[i] != val) {
      nums[notVal] = nums[i];
      notVal++;
    }
    i++;
  }

  return notVal;
}

console.log(removeElement([3, 2, 2, 3], 3)); // 2
