// https://leetcode.com/problems/delete-node-in-a-bst/description/

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

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  // Base case: Deletes the node just like insertion
  if (root == null) {
      return null;
  }

  // Recursive case
  // Locate node with key
  // Exactly the same as insertion here! The base case make is it null and hence, deletes it
  if(key < root.val) {
      root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
      root.right = deleteNode(root.right, key);
  } else {
      // Case 1: No children (the node is a leaf node) OR Case 2: One child
      if(root.left === null) {
          return root.right;
      }
      if(root.right == null) {
          return root.left;
      }

      // Case 3: Two children (trickier case)
      // We have to choose a replacement of the node that will be deleted
      // such that the properties of BST are kept
      // We can choose between largest predecessor (largest value in the left subtree)
      // OR smallest successor (smallest value in the right subtree)

      // I am choosing smallest successor
      let minNode = findMin(root.right);
      // The replacement!
      root.val = minNode.val;

      // Delete the smallest successor (in-order successor)
      root.right = deleteNode(root.right, root.val);
  }

  return root;
};

// Helper function to find the minimum value node in a the right subtree
function findMin(node: TreeNode): TreeNode {
  while(node.left !== null) {
      node = node.left;
  }

  return node;
}

// Helper function to find the max value in the left subtree
// This does not change anything in the parent function, just replace findMin with findMax
// and root.left = deleteNode(root.left, root.val)
function findMax(node: TreeNode): TreeNode {
  while (node.right !== null) {
      node = node.right;
  }

  return node;
}