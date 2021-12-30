/*
  Insertion sort!

  Be sure to call your function insertionSort.

  The idea here is that the beginning of your list is sorted and the everything else is assumed to be an unsorted mess.
  The outer loop goes over the whole list, the index of which signifies where the "sorted" part of the list is. The inner
  loop goes over the unsorted part of the list and inserts it into the correct position in the array.

  Like bubble sort, there's a visualization mechanism available to you. Just call snapshot(myArray) at the beginning of
  your inner loop and it should handle the rest for you!

  And you put xdescribe instead of describe if you want to suspend running the unit tests.
*/

function insertionSort (nums) {
  const length = nums.length;
  let spliced;

  // The BEGINING of the list is assumed sorted; goes over whole array
  for (let i = 1; i < length; i ++) {
    // Goes over unsorted part and inserts in the right position
    for(let j = 0 ; j < i; j++) {
      snapshot(nums);

      if(nums[i] < nums[j]) {
        spliced = nums.splice(i, 1);
        nums.splice(j, 0, spliced);
      }
    }
  }

  snapshot(nums);
}

// unit tests
// do not modify the below code
describe('insertion sort', function() {
  it('should sort correctly', () => {
    var nums = [10,5,3,8,2,6,4,7,9,1];
    insertionSort(nums);
    expect(nums).toEqual([1,2,3,4,5,6,7,8,9,10]);
    done();
  });
});

/*
  Brian's Solution, 10 iterations, mine: 27
  Also, I am not inserting really just swapping
  which leads me to believe that I am doing a
  bubble sort disguised as an insertion sort

  var insertionSort = nums => {
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      snapshot(nums);
      if (nums[i] < nums[j]) {
        let spliced = nums.splice(i, 1);
        nums.splice(j, 0, spliced[0]);
      }
    }
  }
};
*/