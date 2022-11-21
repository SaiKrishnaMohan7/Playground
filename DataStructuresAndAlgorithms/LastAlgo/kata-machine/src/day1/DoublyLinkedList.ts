type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>,
};
export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const nodeToAdd = { value: item } as Node<T>;

        if(!this.head) {
            this.head = this.tail = nodeToAdd;
            this.length++;

            return;
        }

        nodeToAdd.next = this.head;
        this.head.prev = nodeToAdd;
        this.head = nodeToAdd;

        this.length++;
}
    insertAt(item: T, idx: number): void {
        const nodeToAdd = { value: item } as Node<T>;
        // attach the new node and then break the old links

        if (idx > this.length) {
            throw new Error("index to insertAt cannot be greater than length");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        let curr = this.head;
        // traverse the list till have curr pointing at the idx we desire
        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }

        curr = curr as Node<T>;

        nodeToAdd.next = curr;
        nodeToAdd.prev = curr.prev;
        curr.prev = nodeToAdd;
        // We do this here just to pacify TS
        if (curr.prev) {
            curr.prev.next = nodeToAdd;
        }

        this.length++;
}
    append(item: T): void {
        const nodeToAdd = { value: item } as Node<T>;

        if(!this.tail) {
            this.tail = this.head = nodeToAdd;
            this.length++;

            return;
        }

        const currTail = this.tail;
        currTail.next = nodeToAdd;
        nodeToAdd.prev = currTail;
        this.tail = nodeToAdd;

        this.length++;

}
    remove(item: T): T | undefined {
        if (this.length === 0) {
            const headValue = this.head?.value;

            this.head = this.tail = undefined;
            this.length--;
            return headValue;
        }
        let curr = this.head;
        // Traverse this list to find the node that matches the value
        for (let i = 0; curr && i < this.length; ++i) {
            if (curr.value === item) {
                break;
            }

            curr = curr.next;
        }

        if (!curr) {
            return undefined;
        }

        if (curr.next) {
            curr.next.prev = curr.prev;
        }
        if (curr.prev) {
            curr.prev.next = curr.next;
        }

        // If curr is head or tail we need to rejig the head and tail pointers
        if (curr === this.head) {
            this.head = curr.next;
        }

        if (curr === this.tail) {
            this.tail = curr.prev;
        }

        // Clean up after ourselves
        curr.prev = curr.next = undefined;

        this.length--;

        return curr?.value;
}
    get(idx: number): T | undefined {
        let curr = this.head;
        // traverse the list till have curr pointing at the idx we desire
        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }

        return curr?.value;
}
    removeAt(idx: number): T | undefined {
}
}