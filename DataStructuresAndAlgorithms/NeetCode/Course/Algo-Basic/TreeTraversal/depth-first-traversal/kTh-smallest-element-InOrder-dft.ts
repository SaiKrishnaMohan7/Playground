// https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/

function kthSmallest(root: TreeNode | null, k: number): number {
  let count = 0;
  let kThSmallest = -1;

  function inOrderDFT(node: TreeNode | null): void {
    if (!node || count >= k) {
      return;
    }

    inOrderDFT(node.left);
    count = count + 1;
    if (count == k) {
      kThSmallest = node.val;
      return; // If the Kth node is found no need to traverse the right subtree
    }

    inOrderDFT(node.right); // Sometimes the Kth node may be in the right subtree
  }

  inOrderDFT(root);

  return kThSmallest;
}
