# Algorithms and Data Structures

## Data Structures

### Stacks

- Main operations and and their time compelxities:

  - push: add an item to the top of the stack (TOS); *O(1)* since one side
  - pop: remove an item from TOS; *O(1)* since one side
  - peek: read itme at TOS; *O(1)* since one side
  - length/size: no. of elements in the stack
  - search: _search_ - *O(n)*

- Applications:

  - Paranthesis balancing, palindrome, back button of the browser, undo and redo operations

### Sets

  All elments are unique, Order is maintained

- Main operations and their time compelxities:

  - has: a set has a value or not; *O(n)* need verif
  - add: add an item; *O(1)*
  - delete: remove item; *O(1)*
  - size: no. of elements in the set; *O(1)*
  - union: merge two sets; *O(n * k)*
  - intersection: common elements between two sets: *O(n * k)*
  - difference: difference between two sets: *O(n * k)*
  - subset: wether given set is a subset of the given set: *O(n * k)*

- Applications:
  
  - For figuring out he shortest path while laying cables for telecomm

### Queue

  FIFO list, with all members being assigned the same priority

- Main operations and their time compelxities:

  - enqueue: add an item; *O(1)*
  - dequeue: remove an item from the begining; *O(n)* all indices have to be remapped
  - front: get first item in queue; *O(1)*
  - back: get last item in queue; *O(1)*
  - isEmpty: emptiness check; *O(1)*
  - size: no. of elements in the array: *O(1)*

- Applications:

  - Server responding to multiple requests
