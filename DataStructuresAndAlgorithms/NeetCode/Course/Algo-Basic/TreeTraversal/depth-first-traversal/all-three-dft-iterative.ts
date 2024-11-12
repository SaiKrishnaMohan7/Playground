function inOrderTraversal(root:TreeNode | null): number[] | null {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let current: TreeNode = root;

  if (!root) {
    return result;
  }

  while (current !== null || stack.length > 0) {
    // Traverse the entire left side

    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    // Visit node
    current = stack.pop();
    result.push(current.val);

    // Go to the right node!
    current = current.right;
  }

  return result;
}

function preOrderTraversal(root:TreeNode|null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [root];

  if (root == null) {
    return result;
  }

  while(stack.length > 0) {
    // process root
    const node = stack.pop();
    result.push(node.val);

    // Push right child first (Ensures left is processed first)
    if (root.right) {
      stack.push(root.right);
    }
    // This will be processed first
    if (root.left) {
      stack.push(root.left);
    }
  }

  return result;
}

function postOrderTraversal(root:TreeNode | null): number[] {
  if (!root) {
    return [];
  }
  const result: number[] = [];
  const stack1:TreeNode[] = [];
  const stack2:TreeNode[] = [];

  // Stack1 mimic pre-order traversal in reverse (Root, Right, Left).
  while (stack1.length > 0) {
    const node = stack1.pop()!;
    // Nodes are pushed to stack2 as they are processed
    stack2.push(node);

    if (node.left) {
      stack1.push(node.left);
    }
    if (node.right) {
      stack1.push(node.right);
    }
  }

  // Stack2 Holds nodes in the order they were pushed from stack1 (reverse of pre-order).
  while (stack2.length > 0) {
    // Popping from stack2 outputs nodes in post-order (Left, Right, Root).
    const node = stack2.pop()!;
    result.push(node.val);
  }

  return result;
}