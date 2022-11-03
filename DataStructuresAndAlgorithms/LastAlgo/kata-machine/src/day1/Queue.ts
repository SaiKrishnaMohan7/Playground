type Node<T> = {
    value: T,
    next?: Node<T>,
}
export default class Queue<T> {
    public length: number;

    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        let nodeToAdd: Node<T> = {
            value: item,
            next: undefined,
        }

        if (!this.tail) {
            this.head = this.tail = nodeToAdd;
            return;
        }

        this.tail.next = nodeToAdd;
        this.tail = nodeToAdd;

        this.length++;
    }

    deque(): T | void {
        if (!this.head) {
            return undefined;
        }

        let currentHead = this.head;
        this.head = this.head.next;
        currentHead.next = undefined;
        this.length--;

        return currentHead.value;
    }

    peek(): T | void {
        return this.head?.value;
    }
}