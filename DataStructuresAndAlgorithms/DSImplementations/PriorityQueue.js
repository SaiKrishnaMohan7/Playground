/**
 * Lowest Decimal highest priority
 */
class QueueItem {
  constructor(item, priority) {
    this.item = item;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.storage = [];
    this.count = 0;
  }

  isEmpty () {
    return this.count === 0;
  }

  enqueue (item, priority) {
    const newQueueItem = new QueueItem(item, priority);

    if (!this.isEmpty) {
      this.storage.forEach((queueItem, index) => {
        if (queueItem.priority > newQueueItem.priority) {
          this.storage.splice(index, 0, newQueueItem);
          this.count++;
        } else {
          this.storage.push(newQueueItem);
        }
      });
    }
  }

  dequeue () {
    const removed = this.storage.shift(); //test
    this.count--;

    return removed;
  }

  front () {
    return this.storage[0];
  }

  back () {
    return this.storage[this.length - 1];
  }
}