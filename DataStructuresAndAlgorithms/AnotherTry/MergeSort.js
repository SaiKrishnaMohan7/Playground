/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  To read the approach, refer to the class materials at
  https://btholt.github.io/four-semesters-of-cs/

  As always, you can rename describe to be xdescribe to prevent the
  unit tests from running while you're working

  There is no visualization mechanism for this algorithm. Use your own
  preferred method of introspection like console.log().
*/

function mergeSort(nums) {
  if (nums.length < 2) {
    return nums;
  }

  const length = nums.length;
  const middle = Math.floor(length / 2);
  const left = nums.slice(0, middle);
  const right = nums.slice(middle, length);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  return stitch(sortedLeft, sortedRight);

}

function stitch(arr1, arr2) {
  const stitchedArr = [];

  while(arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      stitchedArr.push(arr1.shift()); // shift - Remove element from front
    } else {
      stitchedArr.push(arr2.shift());
    }
  }

  return stitchedArr.concat(arr1, arr2);
}



// unit tests
// do not modify the below code
describe('insertion sort', function() {
  it('should sort correctly', () => {
    var nums = [10,5,3,8,2,6,4,7,9,1];
    var ans = mergeSort(nums);
    expect(ans).toEqual([1,2,3,4,5,6,7,8,9,10]);
  });
});