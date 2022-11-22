function traverse(curr: BinaryNode<number> | null, path: number[]): number[] {
  if (!curr) {
    return path;
  }

  // pre recurse - nothign to do pre recurse
  // recurse left
  traverse(curr.left, path);
  // visit node
  path.push(curr.value);
  // recurse right
  traverse(curr.right, path);
  // post recurse

  return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
  return traverse(head, []);
}