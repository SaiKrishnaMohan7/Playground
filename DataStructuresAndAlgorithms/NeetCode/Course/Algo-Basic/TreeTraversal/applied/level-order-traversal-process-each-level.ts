// 102. https://leetcode.com/problems/binary-tree-level-order-traversal/description/

// - Remember that we use level order traversal when we want to process each node at every level of a tree one by one
// - These two problems do just that. The for loop actually does the processing of the nodes at each level based on the nodes
// in the queue

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function levelOrder(root: TreeNode | null): number[][] {
  const result: Array<Array<number>> = [];
  if (!root) {
    return result;
  }

  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    // Actually process each level!
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}
