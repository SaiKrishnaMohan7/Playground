

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeTwoLists(listNode1: ListNode | null, listNode2: ListNode | null): ListNode | null {
  if(!listNode1) {
      return listNode2;
  }
  if (!listNode2) {
      return listNode1;
  }

  // Create a dummy node, this makes handling the assignment of head of list easier
  const dummy = new ListNode();

  // The pointer to the new list points at dummy to begin with
  let current = dummy;

  while(listNode1 && listNode2) {
      // update current.next to point to the smaller node.
      if (listNode1.val < listNode2.val) {
          current.next = listNode1;
          listNode1 = listNode1.next;
      } else {
          current.next = listNode2;
          listNode2 = listNode2.next;
      }

      // Move pointer to newly attached node
      current = current.next;
  }

  // At this point, list has been built, tack on whatever is remaining
  if (listNode1 !== null) {
      current.next = listNode1;
  } else if(listNode2 !== null) {
      current.next = listNode2;
  }

  // The list start from dummy.next! This has resulted in us not needing to handle the special case of assigning head of list
  return dummy.next;
};

/*
### How the `current` pointer moves

When we say "the current pointer moves," we are referring to the idea that we’re building a new linked list, node by node, as we traverse the two input lists. Here’s how this works step by step:

1. **Dummy Node**: The dummy node is just a starting point (it’s not part of the final list). It gives us a reference point so we can easily attach new nodes.

2. **Pointer `current`**:
   - The `current` pointer initially points to the dummy node.
   - As we compare nodes from both linked lists (`l1` and `l2`), we update `current.next` to point to the smaller node.
   - After attaching a node, we **move** the `current` pointer forward to the newly attached node. This is done by `current = current.next`.

3. **Building the List**:
   - We keep moving the `current` pointer and attaching nodes in sorted order from `l1` and `l2`.
   - Once one list is finished, we simply attach the remaining part of the other list.

By the end of this process, the new linked list is built starting from the `dummy.next` pointer.

Here’s a simplified diagram to help visualize:
- `dummy -> [head of merged list] -> node2 -> node3 -> ... -> last node`

The `dummy` node is just a placeholder; the actual list starts from `dummy.next`.

### Practical Applications of Merging Two Sorted Linked Lists

1. **Merge Step in Merge Sort**:
   - The merge operation is a key part of **merge sort**, a classic sorting algorithm with O(n log n) time complexity. In the context of sorting linked lists, you would often need to merge sorted sublists.

2. **Merging Sorted Data Streams**:
   - If you have two sorted streams of data (e.g., timestamps, transaction logs, sensor data), merging them efficiently can be important for real-time systems or database systems.

3. **Combining Sorted Data from Multiple Sources**:
   - In databases, merging two sorted sets of data is a common operation when performing things like **merge joins** in relational databases.

4. **Real-World Use Case**:
   - **Version Control Systems**: When you merge changes from two different branches (sorted lists of changes), merging sorted linked lists could model how changes are applied.
   - **Calendar Appointments**: Merging two users’ sorted schedules into a single timeline could also be done using this type of algorithm.

### A Simpler Explanation of Movement

Let’s say `l1` is `[1 -> 4 -> 5]` and `l2` is `[2 -> 3 -> 6]`.

- You compare `1` (from `l1`) with `2` (from `l2`), and `1` is smaller.
- You set `current.next = l1` and then move `current` to `1`, and move `l1` to the next node (`4`).
- You compare `4` (from `l1`) with `2` (from `l2`), and `2` is smaller.
- You set `current.next = l2` and then move `current` to `2`, and move `l2` to the next node (`3`).

This process continues until one list is exhausted, and then you attach the rest of the other list.
*/
