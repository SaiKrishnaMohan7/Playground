//146. https://leetcode.com/problems/lru-cache/

class DoublyLinkedListNode {
  key: number;
  value: number;
  prev: DoublyLinkedListNode | null;
  next: DoublyLinkedListNode | null;

  constructor(key: number, value: number) {
      this.key = key;
      this.value = value;
      this.prev = null;
      this.next = null;
  }
}

class LRUCacheLinkedListForOrdering {
  capacity: number;
  store: Map<number, DoublyLinkedListNode>;
  head: DoublyLinkedListNode | null;
  tail: DoublyLinkedListNode | null;

  constructor(capacity: number) {
      this.capacity = capacity;
      this.store = new Map();
  }

  private moveToHead(node: DoublyLinkedListNode): void {
      // Check if the node is already head
      if (this.head === node) {
          return;
      }

      // Remove the node from where it currently is
      if (node.prev) {
          // Is this node somewhere in the middle and NOT the head?
          // if the node has a prev node, make that node point to node.next (severing connection from this node)
          node.prev.next = node.next;
      }
      if (node.next) {
          node.next.prev = node.prev;
      }
      if (node === this.tail) {
          // This is the tail and since it is being moved to the head, the new tail will be the node's prev!
          this.tail = node.prev
      }

      // Now the node is detached!
      // Make it the head
      node.prev = null;
      node.next = this.head; // current head

      if (this.head) {
          // There is currently a head! Change the pointers
          this.head.prev = node;
      }

      // Make node head!
      this.head = node;

      // Handle special case, empty list
      if (!this.tail) {
          this.tail = this.head;
      }

  }

  private removeTail(): void {
      if (!this.tail) {
          return;
      }

      // Delete the entry from the store
      this.store.delete(this.tail.key);

      if (this.tail.prev) {
          // There is a node before the tail
          // Since the tail is LRU, we remove and hence the node prev to the curretn tail will now be the tail
          this.tail = this.tail.prev;
          this.tail.next = null;
      } else {
          this.tail = this.head = null;
      }
  }

  private addToHead(node: DoublyLinkedListNode): void {
      node.prev = null;
      node.next = this.head; // current head will be moved

      if (this.head) {
          this.head.prev = node;
      }

      this.head = node;

      if(!this.tail) {
          // empty list
          this.tail = node;
      }
  }

  get(key: number): number {
      if(this.store.has(key)) {
          const node = this.store.get(key)!; // special TS syntax, lets tsc know that this value will NOT be undefined
          // Move this node to the head of dll
          this.moveToHead(node);
          return node.value;
      }

      return -1;
  }

  put(key: number, value: number): void {
      if (this.store.has(key)) {
          const node = this.store.get(key)!;
          node.value = value;
          this.moveToHead(node);
      } else {
          const newNode = new DoublyLinkedListNode(key, value);
          this.store.set(key, newNode);
          this.addToHead(newNode);

          if (this.capacity < this.store.size) {
              this.removeTail();
          }
      }
  }
}

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/