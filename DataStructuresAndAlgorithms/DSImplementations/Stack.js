// Stack data structure using arrays
class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  getLength() {
    return this.count;
  }

  push (item) {
    this.items.push(item);
    this.count = this.count + 1;
  }

  pop () {
    if (this.count === 0) {
      throw new Error('Cannot perform pop operation on an empty stack');
    }
    this.count - 1;

    return this.items.pop();
  }

  peek () {
    return this.items[this.count - 1];
  }
}

// export default Stack;
