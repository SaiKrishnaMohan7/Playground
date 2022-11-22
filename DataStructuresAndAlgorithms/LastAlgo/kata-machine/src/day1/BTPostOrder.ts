function traverse(curr: BinaryNode<number> | null, path: number[]): number[] {
  if(!curr) {
    return path;
  }

  // recurse left
  traverse(curr.left, path);
  // recurse right
  traverse(curr.right, path);
  // visit node
  path.push(curr.value);

  return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
  return traverse(head, []);
}