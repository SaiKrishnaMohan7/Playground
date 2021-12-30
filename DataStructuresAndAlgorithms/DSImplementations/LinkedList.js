/**
 * LLs can be used for HashTabls collission resolution and LRU caches
 * Linked List
 *
 * Look up:
 *  By Value: O(n)
 *  By Index: O(n)
 *
 * Insertion:
 *  Beginning: O(1)
 *  End: 0(1)
 *  Middle: O(n)
 *
 * Deletion:
 *  Beginning: O(1)
 *  End: O(n)
 *  Middle: O(n)
 */

class Node {
  constructor(value) {
    this.value = value
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.items = [];
  }

  noHeadTail(node) {
    this.head = node;
    this.tail = node;
  }

  addHead(value) {
    const node = new Node(value);

    if(!this.head) {
      this.noHeadTail(node);
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.size++;
  }

  addTail(value) {
    // Node.next will be null, last item
    const node = new Node(value);

    // if there are no items in the LL
    if (!this.head) {
      this.noHeadTail(node);
    } else {
      // Add after tail and new node becomes tail
      this.tail.next = node;
      this.tail =  node
    }

    this.size++;
	}

	removeHead() {
		if(this.head) {
			const currentHead = this.head;
			this.head = this.head.next;
			// Don't think this is required for JS
			currentHead.next = null;
			this.size--;

			return currentHead;
		}
	}

	getPrevious(node) {
		let current = this.head;

 		// Mosh's was better, took it
		while(current) {
			if (current.next === node) {
				return current;
			}
			current = current.next;
		}
	}

	isEmpty() {
		return this.head === null && this.tail === null;
	}

	// In JS this logic would work. Any langiuage that doesn't implement negative array indices, you'd need 2 pointers separated by K - 1 distance
	// Implementation at the bottom
	getKthNodeFromTheEnd(position) {
		// Convert to array and access by index
		if (this.isEmpty() || position > this.size) {
			return;
		}

		const index = position - this.size;

		return this.items[index];
	}

	// Assume you don't know size
	printMiddle() {
		// Will have the items array populated at this point
		const llToArr = this.toArray();

		const len = llToArr.length;
		let index = 0;

		if (len % 2 === 0) {
			index = len / 2;

			console.log(`Middle: ${JSON.stringify(llToArr[index - 1]), JSON.stringify(llToArr[index])}`);
		} else {
			index = len / 2;
			console.log(`Middle: ${JSON.stringify(llToArr[index + 1])}`);
		}
	}

	removeTail() {
		if (this.tail !== this.head) {
			const previousNode = this.getPrevious(this.tail);
			previousNode.next = null;
			this.tail = previousNode;
			this.size --;
		} else {
			this.tail = null;
			this.head = null;
		}
	}

	// inplace reversal
	reverse() {
		if(this.size === 0) {
			return;
		}

		let previous = this.head;
		let current = this.head.next;

		// While there's a next node, run loop
		// Save refernce to current element's next
		// Switch current's next to point to previous
		// Switch previous to current
		// Switch current to next
		while(current) {
			const next = current.next;

			current.next = previous;
			previous = current;
			current = next;
		}

		// Swapping head and tail
		this.tail = this.head;
		this.tail.next = null;
		// After the last iteration of the loop, previous would be set to the last item on LL
		this.head = previous;

	}

	toArray() {
		let current  = this.head;

		while(current) {
			this.items.push(current);
			current = current.next;
		}

		return this.items;
	}

	printMiddle() {
		let slow = this.head;
		let fast = this.head;

		while(fast !== this.last && fast.next !== this.last) {
			slow = slow.next;
			fast = fast.next.next;
		}

		if(fast === this.last) {
			console.log(`Middle: ${slow.value}`);
		} else {
			console.log(`Middle: ${slow.value}, ${fast.value}`);
		}
	}

	hasLoop(){
		let slow = this.head;
		let fast = this.head;

		while(fast !== null && fast.next !== null) {
			slow = slow.next;
			fast = fast.next.next;
		}

		if(fast === slow) {
			return true;
		}

		return false;
	}

	// Can be imlemented without an array, the index can be tracked with a variable
	// incrementing every iteration and returning index when true
  indexOf(element) {
		this.toArray();

    if(this.items.length) {
			for (let i = 0; i < this.size; i++) {
				if(this.items[i].value === element){
					return i;
				}
			}
    }
    return -1;
	}

	contains(element) {
		return this.indexOf(element) !== -1;
	}

}

const ll = new LinkedList();
ll.addTail(7);
ll.addTail(8);
ll.addTail(9);

ll.addHead(1);
ll.addHead(2);
ll.addHead(3);

// ll.removeHead();
// ll.removeTail();
// ll.reverse();
ll.toArray();
// console.log(ll.printMiddle());
console.log(ll);

// We could store to and delete form array fromt the beginning. The order was maintained.

// getKthNodeFromTheEnd(position) {
// 	let pointer_one, pointer_two = this.head;

// 	// distance between 2 pointers should be K - 1
// 	for (let i = 0; i < postion - 1; i++) {
// 		pointer_two = pointer_two.next;
// 	}

// 	// loop and mmove pointers till pointer_two reeaches last
// 	while (pointer_two !== this.last) {
// 		pointer_one = pointer_one.next;
// 		pointer_two = pointer_two.next;
// 	}

// 	return pointer_one.value;
// }


// Assume you don't know size
// This way of solving this problem increaces space complexity since we create a new array
// Even though space complexity is O(n) and time complexity is O(n)

// printMiddle() {
// 	// Will have the items array populated at this point
// 	const llToArr = this.toArray();

// 	const len = llToArr.length;
// 	let index = 0;

// 	if (len % 2 === 0) {
// 		index = len / 2;

// 		console.log(`Middle: ${JSON.stringify(llToArr[index - 1]), JSON.stringify(llToArr[index])}`);
// 	} else {
// 		index = len / 2;
// 		console.log(`Middle: ${JSON.stringify(llToArr[index + 1])}`);
// 	}
// }