function mergeSort(nums:number[]): Array<number> {
  if (nums.length < 2) {
    return nums;
  }

  let middle = nums.length / 2;
  let leftHalf = nums.slice(0, middle);
  let rightHalf = nums.slice(middle, nums.length);

  let sortedLeft = mergeSort(leftHalf);
  let sortedRight = mergeSort(rightHalf);

  return stitch(sortedLeft, sortedRight);
}

function stitch(arr_left:number[], arr_right: number[]): Array<number> {
  let stitchedArr:number[] = [];

  while (arr_left.length && arr_right.length) {
    if(arr_left[0] < arr_right[0]){
      stitchedArr.push(arr_left.shift()!);
    } else {
      stitchedArr.push(arr_right.shift()!);
    }
  }

  return stitchedArr.concat(arr_left, arr_right);
}

function efficientThanOtherStitch(arr_left: number[], arr_right: number[]): Array<number> {
  let stitchedArr: number[] = [];
  let i = 0, j = 0;

  while (i < arr_left.length && j < arr_right.length) {
    if (arr_left[i] < arr_right[j]) {
      stitchedArr.push(arr_left[i]);
      i++;
    } else {
      stitchedArr.push(arr_right[j]);
      j++;
    }
  }

  // Add any remaining elements from arr_left or arr_right
  return stitchedArr.concat(arr_left.slice(i), arr_right.slice(j));
}


// size of `n` reduces as the recursive calls proceed, and this does affect the overall complexity analysis. Let me clarify the reasoning further:

// ### True Cost of `shift` vs. Pointers
// When considering the total number of `shift` operations, the array size (`n`) does indeed reduce as you recursively break down the array into smaller parts during the merge sort. However, this does not fully alleviate the inefficiencies of `shift`. Here's why:

// 1. **Recursion Breaks Down Arrays into Smaller Chunks**:
//    - Each level of recursion breaks the array in half. So, while `n` reduces, there are still many `shift` operations happening across multiple levels of recursion.

// 2. **Re-Indexing Cost Still Adds Up**:
//    - Even when working on smaller subarrays, `shift` causes a re-indexing operation every time you remove an element from the front.
//    - If you shift `n` elements in total across all recursive calls, the average cost per `shift` might still accumulate over all levels. The re-indexing at each step can still cause hidden inefficiencies.

// 3. **Complexity Comparison**:
//    - With a pointer-based approach, each merge pass at a particular recursion level ensures that you're scanning and merging elements in `O(n)` time. Since merge sort has `log n` levels, this makes the entire sorting operation `O(n log n)`.
//    - If using `shift`, the re-indexing cost can push the merging process closer to `O(n^2)` in worst-case scenarios. Even if it's not strictly `O(n^2)`, it can still be significantly slower than the pointer-based version due to unnecessary re-indexing operations.

// ### Example:
// Let's say you're merging two arrays of size `4` each. If you use `shift`, each call to `shift` might cost up to `O(4)` because of re-indexing:
// - Merging might involve `4` such `shift` calls, leading to `4 * O(4) = O(16)`.
// - However, the pointer-based method simply traverses both arrays in `O(8)` without any such overhead.

// ### Why Pointer-Based is Preferred:
// - **Predictable and Efficient**: The pointer approach guarantees linear traversal of the arrays without any extra work per element.
// - **Avoids Hidden Costs**: By bypassing re-indexing, it remains efficient and predictable regardless of the recursion level.

// ### Conclusion:
// While the recursive breakdown reduces the size of the problem at each step, the inefficiencies of `shift` can still accumulate across levels. Using pointers avoids these issues and maintains the desired `O(n log n)` efficiency throughout the merge sort process, making it a better and more scalable choice.