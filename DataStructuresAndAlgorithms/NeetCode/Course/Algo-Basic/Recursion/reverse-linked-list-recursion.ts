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

function reverseList(head: ListNode | null): ListNode | null {
  // Base case: we are at teh end if either of these are true
  if (head == null || head.next == null) {
      return head;
  }

  // Recursive case: newHead will head.next
  // point head.next.next to current head
  // set head.next to null
  const newHead = reverseList(head.next);

  head.next.next = head;
  head.next = null;

  // return newHead
  return newHead;
};