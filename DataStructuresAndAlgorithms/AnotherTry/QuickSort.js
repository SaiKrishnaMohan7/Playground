/*

  Quicksort!

  Name your function quickSort.

  Quicksort should grab a pivot from the end and then separate the list (not including the pivot)
  into two lists, smaller than the pivot and larger than the pivot. Call quickSort on both of those
  lists independently. Once those two lists come back sorted, concatenate the "left" (or smaller numbers)
  list, the pivot, and the "right" (or larger numbers) list and return that. The base case is when quickSort
  is called on a list with length less-than-or-equal-to 1. In the base case, just return the array given.

  As always, you can change describe to xdescribe to prevent the unit tests from running while you're coding.

  No visualization is provided so feel free to use your own debugging methods (like console.log).

*/

function quickSort(nums) {
  const length = nums.length;
  // base case
  if (length < 2) {
    return nums;
  }

  const pivot = nums[length - 1]; // an algo to find good pivot is possible
  let left = [];
  let right = [];

  // less than length - 1 because last item is chosen as pivot
  for (let i = 0; i < length - 1; i ++) {
    if (nums[i] < pivot) {
      left.push(nums[i]);
    } else {
      right.push(nums[i])
    }
  }

  // recurse
  return [...quickSort(left), pivot, ...quickSort(right)];
}


// unit tests
// do not modify the below code
describe('quickSort', function() {
  it('quicksort an array', () => {
    const input = [10, 8, 2, 1, 6, 3, 9, 4, 7, 5];
    const answer = quickSort(input);

    expect(answer).toEqual([1,2,3,4,5,6,7,8,9,10]);

  });
});

/**
 * Quicksort 3
 *
 * To mitigate the risk of a sorted list
 * To chosse pivot, take the value at first index,
 * middle index and last index.
 *
 * Then amonsgt the three, take the one that is the middle of
 * the three
 *
 * ex: [x, a, v, y, t, z]; first = x, middle = v, last z
 * from these three, pick the vaue that is in between the smallest and largest
 */