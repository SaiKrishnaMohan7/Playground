function breadthFirstSearchWithArrayQueue(root: TreeNode): Array<number> {
  if (root == null) {
    return [];
  }

  let result: Array<number> = [];
  let queue: ArrayQueue<TreeNode> = new ArrayQueue();
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    let currentNode = queue.dequeue();
    result.push(currentNode.val);

    if (currentNode.left !== null) {
      queue.enqueue(currentNode.left);
    }
    if (currentNode.right !== null) {
      queue.enqueue(currentNode.right);
    }
  }

  return result;
}

class ArrayQueue<T> {
  private queue: Array<T | null> = [];
  private frontIndex: number = 0;

  enqueue(value: T) {
    this.queue.push(value);
  }

  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const value = this.queue[this.frontIndex];
    this.queue[this.frontIndex] = null;
    this.frontIndex++;

    return value;
  }

  isEmpty(): boolean {
    // We have incremented frontIndex enough that it is either at the last element or out of bounds
    return this.frontIndex >= this.queue.length;
  }
}

// Now this solution is not as complicated, less verbose, still keeps BFS at O(n) and manages the inefficiency of .shift()
// TRADE OFF: Space is wasted! (hmmm.... is there a way to make sure I can keep the space constant? A circular buffer, maybe??)

// Also, why not maintain the index fanciness in the same function? Good point.