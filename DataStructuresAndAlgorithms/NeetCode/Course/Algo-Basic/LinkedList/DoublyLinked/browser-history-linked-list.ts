// 1472. https://leetcode.com/problems/design-browser-history/description/

// In real life History is implemented using LL
// This impl is efficient than the stack impl
class LinkedListNode {
  val: string;
  prev: LinkedListNode | null = null;
  next: LinkedListNode | null = null;

  constructor(val: string, prev: LinkedListNode | null = null, next: LinkedListNode | null = null) {
      this.val = val;
      this.prev = prev;
      this.next = next;
  }
}

class BrowserHistory {
  current: LinkedListNode;
  constructor(homepage: string) {
      this.current = new LinkedListNode(homepage);
  }

  visit(url: string): void {
      const newPage = new LinkedListNode(url, this.current);
      this.current.next = newPage;
      this.current = newPage;
  }

  back(steps: number): string {
      while(this.current.prev && steps > 0) {
          this.current = this.current.prev;
          steps--;
      }

      return this.current.val;
  }

  forward(steps: number): string {
      while(this.current.next && steps > 0) {
          this.current = this.current.next;
          steps--;
      }

      return this.current.val;
  }
}

/**
 * Here's a quick recap of how each function is working:
 *
 * 1. `visit(url: string): void`
 *    - Creates a new `LinkedListNode` with the given URL.
 *    - Sets the current node’s `next` pointer to the new node, effectively moving forward in history.
 *    - Updates `this.current` to point to the new node.
 *
 * 2. `back(steps: number): string`
 *    - Moves backward in the history up to `steps` times or until there are no more previous pages (`this.current.prev === null`).
 *    - Returns the value of the current page after moving.
 *
 * 3. `forward(steps: number): string`
 *    - Moves forward in the history up to `steps` times or until there are no more forward pages (`this.current.next === null`).
 *    - Returns the value of the current page after moving.
 */
