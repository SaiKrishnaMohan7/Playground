//146. https://leetcode.com/problems/lru-cache/

class LRUCache {
  capacity: number;
  store: Map<number, number>;

  constructor(capacity: number) {
      this.capacity = capacity;
      this.store = new Map<number, number>();
  }

  private adjustLRU(key: number, value: number) {
    // delete the key and re-add it as Maps maintain oreder and hence the LRU would be the first val
    this.store.delete(key);
    this.store.set(key, value);
  }

  get(key: number): number {
      if (this.store.has(key)) {
          const value = this.store.get(key)!; // TS fancy, tellign tsc that tis will not be undefined
          this.adjustLRU(key, value);

          return value;
      }

      return -1;

  }

  put(key: number, value: number): void {
      this.adjustLRU(key, value);

      if(this.store.size > this.capacity) {
          this.store.delete(this.store.keys().next().value);
      }
  }
}

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/