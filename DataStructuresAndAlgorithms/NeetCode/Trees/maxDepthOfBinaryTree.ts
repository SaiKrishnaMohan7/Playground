// https://leetcode.com/problems/maximum-depth-of-binary-tree/
// class TreeNode {
//   val: number
//   left: TreeNode | null
//   right: TreeNode | null
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//       this.val = (val===undefined ? 0 : val)
//       this.left = (left===undefined ? null : left)
//       this.right = (right===undefined ? null : right)
//   }
// }

function maxDepth(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  // DFS
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

// the bfs route for the same will need a while and a for loop
// Check them here: https://neetcode.io/practice