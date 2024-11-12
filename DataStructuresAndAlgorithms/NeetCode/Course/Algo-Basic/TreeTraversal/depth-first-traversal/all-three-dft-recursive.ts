// Specific to BSTs; Will visit nodes in ascending order if a tree is a valid BST

function inOrderTraversal(root:TreeNode) {
  if (!root) return;

  inOrderTraversal(root.left);
  console.log(root.val);
  inOrderTraversal(root.right);
}

// Pre-order traversal
// Useful for creating a copy of the tree
// When you want to visit nodes before their children
function preOrderTraversal(root:TreeNode) {
  if (!root) return;

  console.log(root.val);
  preOrderTraversal(root.left);
  preOrderTraversal(root.right);
}

// Useful for deleting nodes
// Calculating dependencies where children nodes must be processed before their parents.
function postOrderTraversal(root:TreeNode) {
  if (!root) return;

  postOrderTraversal(root.left);
  postOrderTraversal(root.right);
  console.log(root.val);
}