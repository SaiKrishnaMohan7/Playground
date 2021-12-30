import { Node } from './BST';


// Rethink, re-watch with a clear mind
class AVLTree {
  constructor () {
    this.root = null;
  }

  add (value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }
  }
}