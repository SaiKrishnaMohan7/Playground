// https://leetcode.com/problems/min-stack/
// Time: O(1) Space: O(1)

// Using the prev pointer here as it is easier to imagine the pointers pointing upwards

class NodeS {
  public val;
  public min;
  public prev;

  constructor(val, min, prev) {
    this.val = val;
    this.min = min;
    this.prev = prev;
  }
}
class MinStack {
  private head?: NodeS;

  constructor() {
    this.head = undefined;
  }

  push(val: number): void {
    let node;
    if (!this.head) {
      node = new NodeS(val, val, null);
      this.head = node;
      return;
    }
    let min = Math.min(val, this.head.min);
    node = new NodeS(val, min, this.head);
    this.head = node;
  }

  pop(): void {
    this.head = this.head?.prev;
  }

  top(): number {
    return this.head?.val;
  }

  getMin(): number {
    return this.head?.min;
  }
}
