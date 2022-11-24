// https://leetcode.com/problems/invert-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function dfs(root: TreeNode | null): TreeNode | null {
  // base case
  if (!root) {
    return null;
  }

  // pre recursive
  let tmp = root.left;
  root.left = root.right;
  root.right = tmp;

  // recursive case
  dfs(root.left);
  dfs(root.right);

  return root;
}
function invertTree(root: TreeNode | null): TreeNode | null {
  return dfs(root);
};

function invertTreeBFS(root: TreeNode | null): TreeNode | null {
  const queue = [root];

  while (queue.length && root) {
    const curr = queue.shift() as TreeNode;

    let tmp = curr.left;
    curr.left = curr?.right;
    curr.right = tmp;

    if (curr.left) {
      queue.push(curr.left);
    }
    if (curr.right) {
      queue.push(curr.right);
    }
  }
  return root;
}