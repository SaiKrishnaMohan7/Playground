class HashTable {
  constructor() {
    this.table = new Array(255);
  }

  add(item) {
    const hash = this.hash(item, 255)

    if (!this.check(item)) {
      this.table[hash] = item;
    }
  }

  check(item) {
    const hash = this.hash(item, 255)

    return !!this.table[hash];
  }

  hash(item, max) {
    let num;
    for (let i = 0; i < item.length; i++) {
      num = num + item.charCodeAt(i) * i;
    }

    return num % max;
  }
}