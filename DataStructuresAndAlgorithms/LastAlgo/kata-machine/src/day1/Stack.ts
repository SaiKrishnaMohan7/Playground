type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>, // it is better to use the prev pointer instead of next as it is easy to imagine
};
export default class Stack<T> {
    public length: number;

    private top?: Node<T>;

    constructor() {
        this.top = undefined;
        this.length = 0;
    }

    push(item: T): void {
        let nodeToAdd: Node<T> = {
            value: item,
        };

        if (!this.top) {
            this.top = nodeToAdd;
            this.length++;
            return;
        }

        nodeToAdd.prev = this.top;
        this.top = nodeToAdd;
        this.length++;
    }
    pop(): T | void {
        if (!this.top) {
            return;
        }

        if (this.length == 0) {
            let currentTop = this.top;
            this.top = undefined;

            return currentTop.value;
        }
        let currentTop = this.top;
        this.top = currentTop.prev;

        this.length = Math.max(0, this.length - 1); // safer we do not watn to go in -ve land

        return currentTop?.value
    }
    peek(): T | void {
        return this.top?.value; // We do not want to expose how we are representing the value, so the Node is for our use not for the user
    }
}