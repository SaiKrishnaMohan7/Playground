
export class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  insert(item) {
    const node = new Node(item);
    if(!this.root) {
      this.root = node;
      return this.root;
    }

    let current = this.root;

    while(true) { // current.leftChild === null || current.rightChild === null ?? Think...
      if (item < current.value) {
        if (!current.leftChild) {
          current.leftChild = node;
          node.parent = current;
          this.size++;
          break;
        }
        current = current.leftChild
      } else if (item > current.value) {
        if (!current.rightChild) {
          current.rightChild = node;
          node.parent = current;
          this.size++;
          break;
        }
        current = current.rightChild
      }
    }
  }

  delete (item) {
    // find the node
    const nodeToDelete = this.find(item) ? this.find(item) : null;
    const nodeToDeleteParent = nodeToDelete ? nodeToDelete.parent : null;

    if (!nodeToDelete) {
      return null;
    }

    // Check if it isLeaf, if so, figure out which child it is and set parent pointer to null
    if (nodeToDelete && this.isLeaf(nodeToDelete)) {
      // will be deleted from memory since it is not referenced
      if (nodeToDeleteParent.value < item) {
        nodeToDeleteParent.leftChild = null;
        this.size--;
      } else {
        nodeToDeleteParent.rightChild = null;
        this.size--;
      }
    } else {
      // If not leaf then attach nodeToDelete's children to its parent sticking to BST rule
      nodeToDeleteParent.leftChild = nodeToDelete.leftChild;
      nodeToDeleteParent.rightChild = nodeToDelete.rightChild;
      this.size--;
    }

    return nodeToDelete;
  }

  find (item) {
    if (!item) {
      return false;
    }

    let current = this.root;

    while (current) {
      if (item === current.value) {
        return current;
      }

      if (item < current.value) {
        if (!current.leftChild) {
          return null;
        }
        current = current.leftChild;
      }

      if (item > current.value) {
        if (!current.rightChild) {
          return null;
        }
        current = current.rightChild;
      }
    }
  }

  // Root -> Left -> Right
  traverse(root) {
    if (!root) {
      return;
    }

    console.log(`root: ${root.value}`);
    this.traverse(root.leftChild);
    this.traverse(root.rightChild);
  }

  // Right -> Left -> Root
  traversePostOrder(root) {
    if (!root) {
      return;
    }

    this.traverse(root.rightChild);
    this.traverse(root.leftChild);
    console.log(`root: ${root.value}`);
  }

  // Left -> Root -> Right
  traverseInOrder(root) {
    if (!root) {
      return;
    }

    this.traverse(root.leftChild);
    console.log(`root: ${root.value}`);
    this.traverse(root.rightChild);
  }

  isLeaf(node) {
    return !(node.leftChild || node.rightChild);
  }

  // Bottom to Top; leaf to root
  height(root) {
    if (!root) {
      return -1;
    }

    if (this.isLeaf(root)) {
      return 0;
    }

    // Post order, visiting leaves first
    return Math.max(this.height(root.leftChild) + this.height(root.rightChild));
  }

  // min value in a Binary Tree
  min (root) {
    const left = min(root.leftChild);
    const right = min(root.rightChild);

    if(this.isLeaf(root)) {
      return 0;
    }

    return Math.min(Math.min(left, right), this.root.value);
  }

  // min value in a BST
  minBST() {
    const current = this.root;
    let leaf;

    while(current) {
      leaf = current;
      current = current.leftChild;
    }

    return leaf.value;
  }

  equal(tree) {
    if(!tree && !this.root) {
      return true;
    }

    if (tree && this.root) {
      return tree.root.value === this.root.value
      && this.equal(tree.leftChild, this.root.leftChild)
      && this.equal(tree.rightChild, this.root.rightChild);
    }

    return false;
  }

  isBST(root, min, max) {
    if (!root) {
      return true;
    }

    if (root.value < min || root.value > max) {
      return false;
    }

    return this.isBST(root.leftChild, min, root.value - 1)
      && this.isBST(root.rightChild, root.value + 1, max)
  }

  nodesAtKdistance (root, distance) {
    if(!root) {
      return;
    }

    if (distance === 0) {
      console.log(root);
    }

    this.nodesAtKdistance(root.leftChild, distance - 1);
    this.nodesAtKdistance(root.rightChild, distance - 1);
  }

}

module.exports = BinaryTree;

// left, root, right
function inOrder(node, func = console.log) {
  if (node.left) {
      node.left.inOrder(func);
  }

  func(node);

  if (node.right) {
      node.right.inOrder(func);
  }
}

// root, left, right
function preOrder(node, func = console.log) {
  func(node);

  if (node.left) {
      node.left.preOrder(func);
  }

  if (node.right) {
      node.right.preOrder(func);
  }
}

// left, right, root
function postOrder(node, func = console.log) {
  if (node.left) {
      node.left.postOrder(func);
  }

  if (node.right) {
      node.right.postOrder(func);
  }

  func(node);
}