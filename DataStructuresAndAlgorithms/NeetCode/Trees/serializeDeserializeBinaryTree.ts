// 297. https://leetcode.com/problems/serialize-and-deserialize-binary-tree/

function dfsSerial (root: TreeNode | null, res: string[]): string {
  // DFS pre order traversal
  // Base Case
  if (!root) {
      return 'null';
  }

  // pre recursive
  res.push(`${root}`);
  // recursive case
  dfsSerial(root.left, res);
  dfsSerial(root.right, res);

  // post recursive case
  return res.join(',');
}

/*
* Encodes a tree to a single string.
*/
function serialize(root: TreeNode | null): string {
return dfsSerial(root, []);
};

function dfsRecon (nodes: string[], idx: number): TreeNode | null {
  if (!nodes.length) {
      return null;
  }
  if (nodes[idx] === 'null') {
      ++idx;
      return null;
  }

  let node = new TreeNode(+nodes[idx]);
  idx = idx + 1;
  node.left = dfsRecon(nodes.slice(idx), idx);
  node.right = dfsRecon(nodes.slice(idx), idx);

  return node;
}
/*
* Decodes your encoded data to tree.
*/
function deserialize(data: string): TreeNode | null {
  let nodes = data.split(',');
  return dfsRecon(nodes, 0);
};

let testTree = new TreeNode(1);
testTree.left = new TreeNode(2);
testTree.right = new TreeNode(3);
testTree.right.left = new TreeNode(4);
testTree.left.right = new TreeNode(5);

console.log(`${serialize(testTree)}`);