class Array {
  constructor (size) {
    this.items = new Array(size);
    this.count = this.items.length; // 0?
  }

  insert(element) {
    // Array is full, resize
    if (this.items.length === this.count) {
      this.items = [...this.items, element];
    } else {
      // Array is not full add at the end
      this.items[count] = element;
    }
    this.count ++;
  }

  deleteAt(index) {
    if(this.count === 0 || index >= count) {
      return new Error('Error!');
    }

    // shift items to the left
    for (let i = index; i < count ; i++) {
      this.items[i] = this.items[i + 1];
    }
    // const deletedElement = this.items.splice(index, 1); // JS way
    this.count --;
  }

  indexOf(element) {
    let index;
    let found = false;

    for (let i = 0; i < this.count; i++) {
      if(this.items[i] === element) {
        found  = true;
        index = i;
      }
    }
    if (found) {
      return index;
    }

    return -1;
  }

  max() {
    let max = 0;

    for(let i = 0; i < count ; i++) {
      if (this.items[i] > max) {
        max = this.items[i];
      }

      return max;
    }
  }

  intersect(array) {
    const intersect = new Array(this.count);

    for (let i = 0; i < count ; i++ ) {
      if (array.indexOf(this.items[i]) >= 0) {
        intersect.insert(this.items[i])
      }
    }

    return intersect;
  }

  reverse() {
    const reverse = new Array(this.count);

    for (let i = 0; i < this.count; i++) {
        reverse[i] = this.items[this.count - (i + 1)];
    }

    this.items = reverse;
  }

  insertAt(index, element) {
    if (index > count) {
      new Error('index cannot be > count');
    }

    if(index === count) {
      let newItems = new Array(this.count * 2);

      // resize, not JSish
      for (let i = 0; i < this.count; i++) {
        newItems[i] = this.items[i];
      }
      this.items = newItems;
    }

    for (let i = index; i < this.count; i++) {
      this.items[i] = this.items[i+1];
    }
    this.items[index] = element;
    this.count ++;
  }
}