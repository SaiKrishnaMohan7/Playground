function breadthFirstTraversalBasicImproved(root: TreeNode): Array<number> {
  if (root !== null) {
    return [];
  }

  let result: Array<number> = [];
  let queue: Array<TreeNode> = [root];
  let frontIndex = 0;

  while (frontIndex < queue.length) {
    let currentNode = queue[frontIndex];
    frontIndex++;
    result.push(currentNode.val);

    if(currentNode.left) {
      queue.push(currentNode.left);
    }
    if(currentNode.right) {
      queue.push(currentNode.right);
    }
  }

  return result;
}

// Ohhh yeeeah! Concise and performant.... yisssss
// What about the space though? hmmmmmm..... good point

// What if I slice the array and keep the slicing minimal? That should improve space utilisation.