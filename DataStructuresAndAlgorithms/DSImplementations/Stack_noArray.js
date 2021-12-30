// https://stackoverflow.com/questions/42684177/node-js-es6-classes-with-require
module.exports = class Stack {
  constructor() {
    this.storage = {};
    this.count = 0;
  }

  push (item) {
    this.storage[this.count] = item;
    this.count ++;
  }

  pop () {
    if (this.count === 0) {
      return undefined;
    }

    const popped = this.storage[this.count - 1];
    delete this.storage[this.count];
    this.count --;

    return popped;
  }

  peek () {
    return this.storage[this.count - 1];
  }

  size () {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }

  show (){
    return this.storage;
  }
}

// private class features
class StackWithObj {
  #storage;
    constructor() {
      this.#storage = {};
      this.size = 0;
    }
    /*
    * Adds a new value at the end of the
    * stack
    * @param {*} value the value to push
    */
    push(item) {
      this.#storage[this.size] = item;
      this.size++;

      return this.#storage;
    }

    /*
    * Removes the value at the end of the stack and returns it
    * @return {*} the last and newest value in the stack
    */
    pop() {
      if (this.size == 0) {
        return null;
      }
      let popped = this.#storage[this.size - 1];
      delete this.#storage[this.size - 1];
      this.size--;

      return popped;
    }
    /*
    * Returns the value at the end of the stack without removing it
    * @return {*} the last and newest value in the stack
    */
    peek() {
      return this.size ? this.#storage[this.size - 1] : undefined;
    }

    show () {
      return this.#storage;
    }
  }

  // const stack = new StackWithObj();
  // stack.push(1);
  // console.log('Post Push--->', stack.show());

  // stack.push(2);
  // stack.pop();
  // console.log('Post Pop', stack.show());