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

// Use cases for BFS

// Level-by-Level View: BFS is useful when you need to process or display the tree by levels,
// such as in problems where you need to perform operations level by level.
// Finding the Shortest Path: In graphs and trees
// BFS helps find the shortest path from the root to a node if all edges (or steps) have the same weight.

// Also called level order traversal; each level in visited in order starting from root, left, right
function breadthFirstTraversal(root: TreeNode | null): number[] {
  if (root == null) {
    return [];
  }

  let result:number[] = [];
  let queue: Array<TreeNode> = [root];

  while (queue.length > 0) {
    // dequeue
    let currentNode = queue.shift();
    result.push(currentNode.val);

    if(currentNode.left !== null) {
      // enqueue left children
      queue.push(currentNode.left);
    }
    if(currentNode.right !== null) {
      // enqueue right children
      queue.push(currentNode.right);
    }
  }

  return result;
}

// In general, BFS is O(n) as we visit every node
// In the above implementation, in practice, calling .shift() would lead to re-indexing
// all elements would have to be shifted,hence, overall time complexity to degrade to O(n²) in the worst case
// A better choice would be a Queue