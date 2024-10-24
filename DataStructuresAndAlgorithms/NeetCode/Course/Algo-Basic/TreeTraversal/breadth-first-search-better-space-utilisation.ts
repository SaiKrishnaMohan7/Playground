function breadthFirstSearchWithBetterSpaceUtilisation(root:TreeNode): Array<number> {
  if (!root){
    return [];
  }

  let result: Array<number> = [];
  let queue: Array<TreeNode> = [root];
  let frontIndex: number = 0;

  while (frontIndex < queue.length) {
    let currentNode = queue[frontIndex];
    frontIndex++;
    result.push(currentNode.val);

    if(currentNode.left) {
      queue.push(currentNode.left);
    }
    if(currentNode.right) {
      queue.push(currentNode.right)
    }

    // Picked this condition as the heuristic
    if (frontIndex > Math.floor(queue.length / 2)) {
      queue = queue.slice(frontIndex);
      frontIndex = 0;
    }
  }

  return result;
}

// Ok, this version is really really good.
// This can be made a bit more space efficent by making use of a circular buffer or ring buffer