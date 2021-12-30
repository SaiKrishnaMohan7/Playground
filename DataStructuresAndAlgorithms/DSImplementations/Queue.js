class Queue {
  constructor() {
    this.storage = [];
    this.count = 0;
  }

  // O(1)
  enqueue (item) {
    this.storage.push(item);
    this.count++;
  }

  // O(N) for this implementation
  dequeue () {
    const removedItem = this.storage.shift();
    this.count--;

    return removedItem;
  }

  // O(1)
  peek () {
    return this.storage[0];
  }

  // O(1)
  back () {
    return this.storage[this.count - 1];
  }

  // O(1)
  isEmtpy () {
    return this.count === 0;
  }

  // O(1)
  size () {
    return this.count;
  }

  // isFull not implemented, we don't have fixed size arrays in JS
}

class QueueWithObject {

  constructor() {
    this.storage = {};
    this.size = 0;
    this.first = undefined;
  }
  /*
  * Enqueues a new value at the end
  * of the queue
  * @param {*} value - the value to
  * enqueue
  */
  enqueue(item) {
    this.storage[this.size] = item;
    this.first = !this.size ? 0 : this.first;
    this.size++;

    return this.storage;
  }

  /*
  * Dequeues the value from the beginning of the queue and returns it
  * @return {*} the first and oldest value in the queue
  */
  dequeue() {
    let dequeued = this.storage[this.first];
    delete this.storage[this.first];
    if (this.size) {
      this.first++;
    }
    this.size--
    return dequeued;
  }
  /*
  * Returns the value at the beginning of the queue without removing it from the queue
  * @return {*} value the first and oldest value in the queue
  */
  peek() {
    return this.storage[this.size];
  }

  show() {
    return this.storage;
  }
}

// const q = new QueueT();

// q.enqueue(1);
// q.enqueue(2);
// q.enqueue(3);
// q.enqueue(4);
// q.enqueue(5);
// q.enqueue(1);

// q.dequeue();
// console.log('Q-->', q.show());
// q.dequeue();
// console.log('Q-->', q.show());
// q.enqueue(100000);
// console.log('Q-->', q.show());

const Stack = require('./Stack_noArray');

class QueueWithTwoStacks {
  #enqStack;
  #deqStack;
  constructor() {
    this.#enqStack = new Stack();
    this.#deqStack = new Stack();
  }

  enqueue (item) {
    this.#enqStack.push(item);
    // console.log('ENQUEQUED!', this.#enqStack.show());
    // console.log('ENQUEQUED! SIZE', this.#enqStack.size());
  }

  dequeue () {
    // console.log('Called--DEQ SIZE', this.#deqStack.size);
    if (this.#deqStack.size() == 0) {
      console.log('DEQ_STACK IS EMPTY');
      if (this.#enqStack.size() == 0) {
        return null;
      }
      // console.log('ENQ Stack SIZE', this.#enqStack.size); size is a Fn.... BECUASE IT WAS NOT THE CLASS THAT YOU THOUGHT YOU WERE IMPORTING.... DUMMY
      // MEAT: This will reverse the order such that it is FIFO
      while (this.#enqStack.size()  > 0) {
        const poppedFromLIFOToSimulateFIFO = this.#enqStack.pop();
        this.#deqStack.push(poppedFromLIFOToSimulateFIFO);
      }
    }

    return this.#deqStack.pop();
  }
}

const qWithTwoStacks = new QueueWithTwoStacks();

qWithTwoStacks.enqueue(1);
qWithTwoStacks.enqueue(2);
qWithTwoStacks.enqueue(3);
console.log(qWithTwoStacks.dequeue());


