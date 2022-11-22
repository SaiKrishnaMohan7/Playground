// To solve this we use DFS as it preserves stucture as it uses a stack
export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
  // Recursion base cases
  if (a === null && b === null) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (a.value !== b.value) {
    return false;
  }

  // Recursive case
  return compare(a?.left, b?.left) && compare(a?.right, b?.right);
}