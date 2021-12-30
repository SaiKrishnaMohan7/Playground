// Adjacency List - Linked List Holding refs to what is node connected to
function addEdge(v1, v2) {
  adjList[v1].push(v2);
  adjList[v2].push(v1);
}

addEdge(v1,v2);


function removeEdge(v1, v2) {
  const v2Index = adjList[v1].indexOf(v2);
  const v1Index = adjList[v2].indexOf(v1);
  adjList[v1].splice(v2Index, 1);
  adjList[v2].splice(v1Index, 1);
}

removeEdge(v1,v2)

// Adjacency Matrix - 2D array, 1 if edge exists 0 if not
function addEdge(v1, v2) {
  adjMatrix[v1][v2] = 1;
  adjMatrix[v2][v1] = 1;
}

addEdge(v1,v2);


function removeEdge(v1, v2) {
  adjMatrix[v1][v2] = 0;
  adjMatrix[v2][v1] = 0;
}

removeEdge(v1,v2)

class Vertex {
  constructor (data) {
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
    this.adjacencyList = {};
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
    neighborsOfNode.forEach(neighborNode => {
      let neighborNodeNeighbors = this.adjacencyList[neighborNode.identifier];
      this.adjacencyList[neighborNode.identifier] = neighborNodeNeighbors.filter(vertex => vertex.identifier !== node.identifier);
    });

    return node;
  }
}

const myGraph = new Graph();

console.log(myGraph)