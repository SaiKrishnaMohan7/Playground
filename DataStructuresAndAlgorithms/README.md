# My trials and repeated failures to build a habit

## Tricks

- If input array is sorted then
  - Binary search
  - Two pointers

- If asked for all permutations/subsets then
  - Backtracking

- If given a tree then
  - DFS
  - BFS

- If given a graph then
  - DFS
  - BFS

- If given a linked list then
  - Two pointers

- If recursion is banned then
  - Stack

- If must solve in-place then
  - Swap corresponding values
  - Store one or more different values in the same pointer

- If asked for maximum/minumum subarray/subset/options then
  - Dynamic programming

- If asked for top/least K items then
  - Heap

- If asked for common strings then
  - Map
  - Trie

- Else
  - Map/Set for O(1) time & O(n) space
  - Sort input for O(nlogn) time and O(1) space

## Concepts, trade-offs and observations

- Memoization
  - Trade-off space complexity for time complexity

- Recursion Concept
  - Identify base case(s)
  - Identify recursive case(s)
  - Return where appropriate
  - Write procedures for each case that bring you closer to the base case(s)

  - ES6 offers TCO (Tail Call Optimization), which allows some functions to be called without growing the call stack
    - [TCO, Alex R](https://2ality.com/2015/06/tail-call-optimization.html)

- Divide and Conquer Concept
  - Recognize base case
  - Divide: Break problem down during each call
  - Conquer: Do work on each subset
  - Combine: Solutions

  - Cut search space by fraction; log n (sorted array)

  - Naive sorts:
    - Bubble Sort - Loop through an array, comparing adjacent indices and swapping the greater value to the end
      - Concept:
        - compare two adjacent numbers
        - swap their places if the smaller index's value is larger than the larger index's
        - Continue looping through until all values are in ascending order
    - Insertion Sort
    - Selection Sort
  - Divide and Conquer sorts:
    - Mergesort - Recursively merge sorted sub-lists O(n logn), linear for merge step and log (base 2 since two halves) n for the mergeSort step
      - Concept:
        - mergeSort(list)
          - initialize n to the length of the list // O(1)
          - base case is if n < 2, just return // O(1)
          - initialize mid to n/2 // O(1)
          - left = left slice of array to mid - 1
          - right = right slice of array mid to n - 1
          - mergeSort(left) // O(n/2)
          - mergeSort(right) // O(n/2)
          - merge(left, right) // O(n)
    - Quiksort
  - Greedy Algorithms
    - Local optima

  - Dynamic Programming
    - Optimizations (memoization)

| Complexity  |  Operation |
|---|---|
| O(1)  |  Running a statement  |
| O(1)  |  Value look-up on an array, object, variable  |
| O(logn)  |   Loop that cuts problem in half every iteration |
| O(n)  |   Looping through the values of an array |
| O(n^2)  | Double nested loops  |
| O(n^3)  | Triple nested loops  |

## A good source

- [SRC](https://seanprashad.com/leetcode-patterns)
- [Another](https://github.com/seanprashad/leetcode-patterns)
