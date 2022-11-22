function traverse(curr: BinaryNode<number> | null, path: number[]) {
  // base case
  if (!curr) {
    return path;
  }

  // pre recurse - visit node
  path.push(curr.value);
  // recurse
  traverse(curr.left, path); // recurse left
  traverse(curr.right, path); // recurse right
  // post - nothing to do in post recurse

  return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
  return traverse(head, []);
}