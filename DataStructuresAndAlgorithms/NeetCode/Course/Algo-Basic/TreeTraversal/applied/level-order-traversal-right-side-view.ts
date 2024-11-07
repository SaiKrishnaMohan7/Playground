// 199. https://leetcode.com/problems/binary-tree-right-side-view/description/

// RIGHT SIDE VIEW MEANS last visible node on each level from the right..... MC
function rightSideView(root: TreeNode | null): number[] {
  const result: number[] = [];

  if (!root) return result;

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
      const levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
          const node = queue.shift()!;

          // Add the last node of the current level to the result
          if (i === levelSize - 1) {
              result.push(node.val);
          }

          // Add children to the queue
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
      }
  }

  return result;
}