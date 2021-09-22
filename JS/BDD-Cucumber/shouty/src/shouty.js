class Person {
  constructor(network) {
    this.messages = [];
    this.network = network;

    this.network.subscribe(this);
  }
  moveTo (distance) {};
  shout (message) { this.network.broadcast(message); };
  hear (message) { this.network.push(message); }
  messagesHeard() {return this.messages};
}

class Network {}

module.exports = {Person, Network};