// 1472. https://leetcode.com/problems/design-browser-history/description/

class BrowserHistory {
  current: string;
  forwardHistoryStack: Array<string>;
  backwardHistoryStack: Array<string>;

  constructor(homepage: string) {
      this.current = homepage;
      this.backwardHistoryStack = new Array<string>();
      this.forwardHistoryStack = new Array<string>();
  }

  visit(url: string): void {
      // push current to back stack
      this.backwardHistoryStack.push(this.current);
      // Set current to url being visited
      this.current = url;
      // clear forward history
      this.forwardHistoryStack = [];
  }

  back(steps: number): string {
      while(this.backwardHistoryStack.length && steps > 0) {
          // push current to forward history
          this.forwardHistoryStack.push(this.current);
          // pop from backward stack
          const page = this.backwardHistoryStack.pop();
          // set current
          this.current = page;
          // decrement steps
          steps--;
      }

      return this.current;
  }

  forward(steps: number): string {
      while(this.forwardHistoryStack.length && steps > 0) {
          // push to back history
          this.backwardHistoryStack.push(this.current);
          // pop off forward stack
          const page = this.forwardHistoryStack.pop();
          // set current
          this.current = page;
          // decrement steps;
          steps--;
      }

      return this.current;
  }
}
