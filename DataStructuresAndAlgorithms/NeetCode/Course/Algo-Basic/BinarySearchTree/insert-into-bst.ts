// https://leetcode.com/problems/insert-into-a-binary-search-tree/description/

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root == null) {
      return new TreeNode(val);
  }
  // Key Takeaway:

  // The root itself doesn’t change; what changes are its children references (root.left or root.right).
  // This is why the line root.right = insertIntoBST(root.right, val); is not reassigning root but updating root.right to reflect the correct state after insertion.

  if(val > root.val) {
      root.right = insertIntoBST(root.right, val);
  } else {
      root.left = insertIntoBST(root.left, val);
  }

  return root;
};