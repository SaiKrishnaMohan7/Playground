function breadthFirstSearchWithRingBufferInFn(root: TreeNode | null): number[] {
  if (root === null) {
      return [];
  }

  let result: number[] = [];
  let queue: (TreeNode | null)[] = new Array(100); // Set a fixed capacity
  let frontIndex = 0;
  let rearIndex = 0;
  let capacity = 100;

  // Initialize the queue with the root
  queue[rearIndex] = root;
  rearIndex = (rearIndex + 1) % capacity;

  while (frontIndex != rearIndex) { // As long as frontIndex has not caught up to rearIndex
      let currentNode = queue[frontIndex];
      frontIndex = (frontIndex + 1) % capacity; // Move the frontIndex forward

      if (currentNode !== null) {
          result.push(currentNode.val);

          // Enqueue the children
          if (currentNode.left !== null) {
              queue[rearIndex] = currentNode.left;
              rearIndex = (rearIndex + 1) % capacity; // Wrap around if needed
          }
          if (currentNode.right !== null) {
              queue[rearIndex] = currentNode.right;
              rearIndex = (rearIndex + 1) % capacity; // Wrap around if needed
          }
      }
  }

  return result;
}
