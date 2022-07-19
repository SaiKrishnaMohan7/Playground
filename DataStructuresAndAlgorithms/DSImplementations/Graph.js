// Adjacency List - Linked List Holding refs to what is node connected to
function addEdge(v1, v2) {
  adjList[v1].push(v2);
  adjList[v2].push(v1);
}

addEdge(v1, v2);

function removeEdge(v1, v2) {
  const v2Index = adjList[v1].indexOf(v2);
  const v1Index = adjList[v2].indexOf(v1);
  adjList[v1].splice(v2Index, 1);
  adjList[v2].splice(v1Index, 1);
}

removeEdge(v1, v2);

// Adjacency Matrix - 2D array, 1 if edge exists 0 if not
function addEdge(v1, v2) {
  adjMatrix[v1][v2] = 1;
  adjMatrix[v2][v1] = 1;
}

addEdge(v1, v2);

function removeEdge(v1, v2) {
  adjMatrix[v1][v2] = 0;
  adjMatrix[v2][v1] = 0;
}

removeEdge(v1, v2);

class Vertex {
  constructor(data) {
    this.data = data;
    // Store the unique identifier of adjacent nodes here
    // this.adjacentVertices = []; // redundant as adjList maintains this info and vertices offer O(1) access
    // a unique identifier for the node
    this.identifier = null;
  }
}
class Graph {
  constructor(directed, weighted) {
    // Node as key mapped to array of connected nodes
    this.adjacencyList = {}; // as oppossed to a adjacency matrix
    this.vertices = {};
    this.directed = directed;
    this.weighted = weighted;
  }

  #isInGraph(vertex) {
    return this.adjacencyList[vertex.identifier];
  }
  /*
   * Adds a new value
   * @param {*} value the value to add
   */
  addNode(value) {
    const vertex = new Vertex(value);
    vertex.identifier = uuidv4();
    vertex.data = value;
    this.vertices[vertex.identifier] = vertex;
  }

  /*
   * Adds an edge between nodeA and nodeB
   * @param {*} nodes to connect
   */
  addEdge(nodeA, nodeB) {
    if (!(this.#isInGraph(nodeA) && this.#isInGraph(nodeB))) {
      return null;
    }

    this.adjacencyList[nodeA.identifier].push(nodeB.identifier);
    this.adjacencyList[nodeB.identifier].push(nodeA.identifier);
  }

  /*
   * Removes a node
   * @param {*} node to remove
   */
  // TODO: Think of the case if value is sent and not the node
  removeNode(node) {
    if (!this.#isInGraph(node)) {
      return null;
    }

    const neighborsOfNode = this.adjacencyList[node.identifier];
    // O(n^2) Quadratic time; What if we sort neighbors by value?
    neighborsOfNode.forEach((neighborNode) => {
      let neighborNodeNeighbors = this.adjacencyList[neighborNode.identifier];
      this.adjacencyList[neighborNode.identifier] =
        neighborNodeNeighbors.filter(
          (vertex) => vertex.identifier !== node.identifier
        );
    });

    return node;
  }

  /*
   * Searches through a Graph depth first, meaning, all the children of a given node are visited first till we encounter a node
   * that has no children
   *
   * DFT uses a Stack to keep track of nodes to operate on and a map to keep track of nodes that have been visited
   *
   * @param {startingNode} Node node to start from
   */
  depthFirstTraversal(startingNode) {
    if (!startingNode || typeof startingNode !== Node) {
      return null;
    }

    const nodesVisited = {};
    const nodeStack = [];
    // add unvisited nodes to stack
    nodeStack.push(startingNode.identifier);
    // mark as visited
    nodesVisited[startingNode.identifier] = true;
    while (nodeStack.length) {
      let current = nodeStack.pop();
      let neighborsOfCurrentNode = this.adjacencyList[current.identifier];
      // See if node has any unvisited children
      // add to stack if so
      // add to visited map
      neighborsOfCurrentNode.forEach((neighborNode) => {
        if (!nodesVisited[neighborNode.identifier]) {
          nodeStack.push(neighborNode);
          nodesVisited[neighborNode.identifier] = true;
        }
      });
    }
  }

  /*
   * Searches through a Graph breadth first, meaning, all the nodes at a the same depth are visited first
   *
   * BFT uses a Queue to keep track of nodes to operate on and a map to keep track of nodes that have been visited
   *
   * @param {startingNode} Node node to start from
   */
  breadthFirstTraversal(startingNode) {
    if (!startingNode || typeof startingNode !== Node) {
      return null;
    }

    const nodesVisited = {};
    const nodeQueue = [];
    // add unvisited nodes to the Queue
    nodeQueue.push(startingNode.identifier);
    // mark as visited
    nodesVisited[startingNode.identifier] = true;
    while (nodeQueue.length) {
      let current = nodeQueue.shift();
      let neighborsOfCurrentNode = this.adjacencyList[current.identifier];
      // See if node has any unvisited children
      // add to stack if so
      // add to visited map
      neighborsOfCurrentNode.forEach((neighborNode) => {
        if (!nodesVisited[neighborNode.identifier]) {
          nodeQueue.push(neighborNode);
          nodesVisited[neighborNode.identifier] = true;
        }
      });
    }
  }
}

const myGraph = new Graph(false, false);

console.log(myGraph);
