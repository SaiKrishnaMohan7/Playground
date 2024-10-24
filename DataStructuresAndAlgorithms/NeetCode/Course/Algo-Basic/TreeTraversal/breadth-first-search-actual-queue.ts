function breadthFirstSearchWithRealQueue(root: TreeNode): number[] {
  if (root == null) {
    return [];
  }

  let result: Array<number> = [];
  let queue: Queue = new Queue();
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    let currentNode = queue.dequeue();
    result.push(currentNode.val);

    if (currentNode.left) {
      queue.enqueue(currentNode.left);
    }
    if (currentNode.right) {
      queue.enqueue(currentNode.right);
    }
  }

  return result;
}





// real queue
class QueueNode {
  val: TreeNode;
  next: QueueNode | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  head: QueueNode | null;
  tail: QueueNode | null;

  enqueue(val: TreeNode) {
    const newNode = new QueueNode(val);

    if (this.tail) {
      this.tail.next = newNode
    }
    // explicitly set tail pointer no matter what
    this.tail = newNode;
    if (this.head == null) {
      this.head = this.tail = newNode;
    }
  }

  dequeue(): TreeNode | null {
    if (!this.head) {
      return null;
    }

    const node = this.head.val;
    this.head = this.head.next;

    if(!this.head) {
      this.tail = null;
    }

    return node;
  }

  isEmpty(): boolean {
    return this.head === null;
  }
}

// This approach makes things a lot more efficient than the BASIC bfs. Because enqueue and dequeue are O(1) operations
// BFS doesn't balloon to O(n^2) because of shift.

// Now that said; Implementing this queue did take me a while and it is pretty verbose
// Why not keep using the array as queue but when dequeue happens, set the element to NULL and move the pointer ahead?