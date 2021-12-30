const BinaryTree = require('../Implemenations/BinaryTree');

function arrToBST(arr) {
  const bst = new BinaryTree();

  for (let i = 0; i < arr.length; i++) {
    bst.insert(arr[i]);
  }
  // console.log(bst.find(1));
  return bst
}
function nodeKDist() {
  const bst = new BinaryTree();

  arrToBST([10, 5, 15, 6, 1, 8, 12, 18, 17]);

  console.log(bst.nodesAtKdistance(bst.root, 1))

}

// console.log(arrToBST([10, 5, 15, 6, 1, 8, 12, 18, 17]));
nodeKDist();
