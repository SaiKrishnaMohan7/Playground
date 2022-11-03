export default function bubble_sort(arr: number[]): void {
  let i = 0;
  let j = i + 1;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) { // The significance of arr.length - 1 - i is that in the first iteration of bubble sort, the largest is moved to the end so we don't need to compare that again. This applies to subsequent iterations as well
        if (arr[j] > arr[j + 1]) {
          let swap = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = swap;
      }
    }
  }
  // doesn't work we need two loops
  // while (i < arr.length && j < arr.length) {
  //   if (arr[i] > arr[j]) {
  //     let swap = arr[i];
  //     arr[i] = arr[j];
  //     arr[j] = swap;
  //   }
  //   i++;
  //   j++;
  // }
}