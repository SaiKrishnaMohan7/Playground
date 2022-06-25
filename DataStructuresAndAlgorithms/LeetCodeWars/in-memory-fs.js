/**
 * Problem 1166 Design in memory fs
 *
 * You are asked to design a file system that allows you to create new paths and associate them with different values.
 * The format of a path is one or more concatenated strings of the form: / followed by one or more lowercase English letters. For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string "" and "/" are not.
 *
 * Implement the FileSystem class:
 *  bool createPath(string path, int value) Creates a new path and associates a value to it if possible and returns true. Returns false if the path already exists or its parent path doesn't exist.
 *  int get(string path) Returns the value associated with path or returns -1 if the path doesn't exist.
 *
 *
 * Solved using a trie, a prefix tree, best fit DS for framing this Problem
 */

class Node {
  constructor(key, value) {
    this.children = []; // Nodes
    this.value = value;
    this.key = key;
  }
}

class FileSystem {
  constructor() {
    this.fs = new Node("", "");
  }

  get(path) {
    // break the incoming string into parts, each path token representing a folder
    let parts = path.split("/").slice(1); // ignore the '/' and keep the rest of the path parts
    let i = 0;
    // pointer that we use to track where we are`
    let current = this.fs;

    // We loop through the array and check if the token matches a child's key? Is the folder already present in the trie?
    while (i < parts.length) {
      let dirName = parts[i];
      // we check every token in the arry to make sure that it is a valid path
      if (current.children.find((child) => child.key == dirName)) {
        current = current.children.find((child) => child.key == dirName);
        i = i + 1;
      } else {
        return -1;
      }
    }

    return current.value;
  }

  createPath(path, value) {
    let parts = path.split("/").slice(1);
    let i = 0;
    let current = this.fs;

    while (i < parts.length) {
      let dirName = parts[i];
      if (current.children.find((child) => child.key == dirName)) {
        current = current.children.find((child) => child.key == dirName);
        i = i + 1;
      } else {
        // Is this the last token? We have gone through all the other tokens and confirmed validity
        if (i === parts.length - 1) {
          // add
          current.children.push(new Node(parts[i], value));
          return true;
        } else {
          // It is not the last token and does not exist in the trie so it is invalid
          return false;
        }
      }
    }

    return false;
  }
}

/**
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.createPath(path,value)
 * var param_2 = obj.get(path)
 */
var obj = new FileSystem();
var param_1 = obj.createPath("/a", 1);
// var param_2 = obj.get(path);
