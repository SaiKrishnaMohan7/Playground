function search(curr: BinaryNode<number> | null, needle: number): boolean {
  if (!curr) {
    return false;
  }

  if (curr.value === needle) {
    return true;
  }

  if (curr.value > needle) {
    return search(curr.left, needle);
  }

  return search(curr.right, needle);

}


export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return search(head, needle);
}