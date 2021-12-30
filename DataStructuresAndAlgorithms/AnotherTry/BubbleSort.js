// Front End Masters: Four Semesters of Comp Sci in 5 hours

/*
  Write a bubble sort here
  Name the function bubbleSort

  If you want to suspend running the unit tests, change describe to xdescribe

  Bubble sort works by comparing two adjacent numbers next to each other and then
  swapping their places if the smaller index's value is larger than the larger
  index's. Continue looping through until all values are in ascending order

  Provided is an optional visualization helper. Call snapshot(yourArray) at the
  beginning of each iteration of your inner loop with the state of the being-sorted
  array and the helper tool will show you how your array looks in the HTML section
  of CodePen. This is optional and only for your help.

*/

// O(n^2) - 2 loops

/* Why use two loops?
    I used just the one for loop at first and the array did not get sorted as it should have because
    it reached the end of the array, which is exactly what it was supposed to do. However, the objective is to
    sort the array completely i.e. keep looping till all the numbers are where they should be!

    Solution: swapped boolean and a do-while loop
      do block holds the for loop and every time a
      swap takes palce we set the flag to true

      while block will continue will make the do
      block to continously execute till the flag, swapped,
      is false i.e. there are no more numbers that are out of place!
*/
function bubbleSort(arr) {
  let length = arr.length;
  let swap, idx = 0;
  let swapped;

  do {
    swapped = false;
    for (idx = 0; idx < length; idx++) {
      if (arr[idx] > arr[idx+1]) {
        swap = arr[idx];
        arr[idx] = arr[idx + 1];
        arr[idx+1] = swap;

        swapped = true;
      }
    }
  }while(swapped);

  return arr;
}


// unit tests
// do not modify the below code
describe('bubble sort', function() {
  it('should sort correctly', () => {
    var nums = [10,5,3,8,2,6,4,7,9,1];
    bubbleSort(nums);
    expect(nums).toEqual([1,2,3,4,5,6,7,8,9,10]);
    done();
  });
});