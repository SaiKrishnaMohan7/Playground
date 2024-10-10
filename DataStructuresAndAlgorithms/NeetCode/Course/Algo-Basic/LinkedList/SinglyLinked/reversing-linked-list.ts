// https://leetcode.com/problems/reverse-linked-list/submissions/1147349753/
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

// Also here: DataStructuresAndAlgorithms/DSImplementations/LinkedList.js

// Time: O(n) Space: O(1)

function reverseList(head: ListNode | null): ListNode | null {
  if (head == null) {
    return null;
  }
  let previous = null;
  let current = head;

  while (current !== null) {
    const next = current.next;

    current.next = previous;
    previous = current;
    current = next;
  }

  return previous;
}
