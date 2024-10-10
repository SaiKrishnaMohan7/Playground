// https://leetcode.com/problems/design-linked-list/description/

// The index is the tricky part in this problem
// Index is not saved but is used to loop through the list! Almost like an offset.
class LinkedListNode {
  value: number;
  prev: LinkedListNode | null;
  next: LinkedListNode | null;

  constructor(value: number) {
      this.value = value;
      this.prev = null;
      this.next = null;
  }
}

class MyLinkedList {
  head: LinkedListNode | null;
  tail: LinkedListNode | null;
  size: number;

  constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
  }

  // Get the value of the node at the given index
  get(index: number): number {
      if (index < 0 || index >= this.size) return -1;
      let curr = this.head;
      for (let i = 0; i < index; i++) {
          curr = curr.next;
      }
      return curr ? curr.value : -1;
  }

  // Add a new node at the head of the list
  addAtHead(val: number): void {
      const newNode = new LinkedListNode(val);
      if (!this.head) {  // Empty list
          this.head = this.tail = newNode;
      } else {
          newNode.next = this.head;
          this.head.prev = newNode;
          this.head = newNode;
      }
      this.size++;
  }

  // Add a new node at the tail of the list
  addAtTail(val: number): void {
      const newNode = new LinkedListNode(val);
      if (!this.tail) {  // Empty list
          this.head = this.tail = newNode;
      } else {
          this.tail.next = newNode;
          newNode.prev = this.tail;
          this.tail = newNode;
      }
      this.size++;
  }

  // Add a new node at the given index
  addAtIndex(index: number, val: number): void {
      if (index < 0 || index > this.size) return;

      if (index === 0) {
          this.addAtHead(val);
      } else if (index === this.size) {
          this.addAtTail(val);
      } else {
          const newNode = new LinkedListNode(val);
          let curr = this.head;
          for (let i = 0; i < index; i++) {
              curr = curr.next;
          }

          let prevNode = curr.prev;
          prevNode.next = newNode;
          newNode.prev = prevNode;
          newNode.next = curr;
          curr.prev = newNode;

          this.size++;
      }
  }

  // Delete the node at the given index
  deleteAtIndex(index: number): void {
      if (index < 0 || index >= this.size) return;

      if (index === 0) {
          this.head = this.head.next;
          if (this.head) this.head.prev = null;
          if (this.size === 1) this.tail = null;  // List becomes empty
      } else if (index === this.size - 1) {
          this.tail = this.tail.prev;
          if (this.tail) this.tail.next = null;
      } else {
          let curr = this.head;
          for (let i = 0; i < index; i++) {
              curr = curr.next;
          }

          let prevNode = curr.prev;
          let nextNode = curr.next;
          prevNode.next = nextNode;
          nextNode.prev = prevNode;
      }
      this.size--;
  }
}

/**
* Your MyLinkedList object will be instantiated and called as such:
* var obj = new MyLinkedList()
* var param_1 = obj.get(index)
* obj.addAtHead(val)
* obj.addAtTail(val)
* obj.addAtIndex(index,val)
* obj.deleteAtIndex(index)
*/