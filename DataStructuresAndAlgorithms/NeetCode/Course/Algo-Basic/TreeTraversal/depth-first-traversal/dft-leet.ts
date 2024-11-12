// https://leetcode.com/problems/binary-tree-inorder-traversal/

function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  function traverse(node: TreeNode | null) {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
  }
  traverse(root);
  return result;
}