export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  // We are using a JS queue here, which is an ArrayList under the hood, so push and pop are O(1) and shift and unshift O(n) and since
  // bfs is O(n) therefore this may end up being O(n^2)
  const queue = [head];
  let found = false;

  while (queue.length) {
    const curr: BinaryNode<number> | undefined = queue.shift(); // deque

    if (curr && curr.value === needle) {
      found = true;
      break;
    }

    if (curr?.left) {
      queue.push(curr.left);
    }
    if (curr?.right) {
      queue.push(curr.right);
    }
  }

  return found;
}