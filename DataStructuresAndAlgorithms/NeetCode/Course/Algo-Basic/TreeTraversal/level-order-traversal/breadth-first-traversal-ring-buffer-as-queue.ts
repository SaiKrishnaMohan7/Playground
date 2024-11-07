function breadthFirstTraversalRingBuffer(root: TreeNode): Array<number> {
  if (!root) {
    return [];
  }

  const result: number[] = [];
  const queue: RingBuffer<TreeNode> = new RingBuffer(100);
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeque();
    if (currentNode !== null) {
      result.push(currentNode.val);
      // Enqueue the children
      if (currentNode.left !== null) {
        queue.enqueue(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.enqueue(currentNode.right);
      }
    }
  }

  return result;
}

class RingBuffer<T> {
  private frontIndex: number = 0;
  private rearIndex: number = 0;
  private buffer: Array<T | null>;
  private capacity: number = 0;
  private size: number = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array(capacity).fill(null);
  }

  enqueue(value: T): boolean {
    if (this.isFull()) {
      return false;
    }

    this.buffer[this.rearIndex] = value;
    // wrap around! Better space utilisation....
    // All the null from dequeue will be utilised, no need to slice
    this.rearIndex = (this.rearIndex + 1) % this.capacity;
    this.size++;

    return true;
  }

  dequeque(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const value = this.buffer[this.frontIndex];
    this.buffer[this.frontIndex] = null;
    // Wrap around
    this.frontIndex = (this.frontIndex + 1) % this.capacity;
    this.size--;

    return value;
  }

  isFull(): boolean {
    return this.size === this.capacity;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getSize(): number {
    return this.size;
  }
}

// Why Use a Circular Buffer?

// Space Efficiency: Reuses space at the beginning instead of expanding like a dynamic array or shifting elements.
// Constant-Time Operations: Enqueueing and dequeueing are O(1) because there's no shifting.