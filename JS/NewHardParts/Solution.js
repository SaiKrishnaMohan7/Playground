// Challenge 1

function sayHello() {
  function printHello() {
    console.log("HELLO");
  }
  setTimeout(printHello, 1000);
}

// Uncomment the line below when ready
sayHello(); // should log "Hello" after 1000ms

// Challenge 2
var promise = new Promise(function (resolve, reject) {
  // ADD CODE HERE

  setTimeout(resolve, 1000);
});

// Should print out "Resolved!"
// ADD CODE HERE
function printResolve() {
  console.log("RESOLVED!");
}
promise.then(printResolve);

// Challenge 3

promise = new Promise(function (resolve, reject) {
  // ADD CODE HERE
  setTimeout(reject, 1000);
});

// Should print out "Reject!"
// ADD CODE HERE
function printReject() {
  console.log("REJECTED!");
}
promise.catch(printReject);

// Challenge 4

promise = new Promise(function (resolve, reject) {
  // ADD CODE HERE
  resolve("Promise has been resolved!");
});

// Uncomment the lines below when ready
promise.then(() => console.log("Promise has been resolved!"));
console.log("I'm not the promise!");

// Challenge 5
function delay() {
  return new Promise(function (resolve, reject) {
    // ADD CODE HERE
    setTimeout(resolve, 1000);
  });
}

// Uncomment the code below to test
// This code should log "Hello" after 1000ms
delay().then(sayHello);

// Challenge 6
//
// ADD CODE BELOW
var secondPromise = new Promise(function (resolve, reject) {
  resolve("Second Promise");
});
var firstPromise = new Promise(function (resolve, reject) {
  resolve(secondPromise);
});

firstPromise.then((val) => console.log(val));

// Challenge 7
const fakePeople = [
  { name: "Rudolph", hasPets: false, currentTemp: 98.6 },
  { name: "Zebulon", hasPets: true, currentTemp: 22.6 },
  { name: "Harold", hasPets: true, currentTemp: 98.3 },
];

const fakeAPICall = (i) => {
  const returnTime = Math.floor(Math.random() * 1000);
  return new Promise((resolve, reject) => {
    if (i >= 0 && i < fakePeople.length) {
      setTimeout(() => resolve(fakePeople[i]), returnTime);
    } else {
      reject({ message: "index out of range" });
    }
  });
};

function getAllData() {
  // CODE GOES HERE
  return Promise.all([fakeAPICall(0), fakeAPICall(1), fakeAPICall(2)]);
}

getAllData().then((val) => console.log(val));

// ******************************** //

/**
 * A rule of thumb for closures
 *
 * Think what do you want the function to REMEMBER between executions
 * Think what piece of data do you want in your BACKPACK
 *
 *
 * CLOSED OVER VARIABLE ENVIRONMENT - C.O.V.E
 *
 */

// Challenge 1
// A) Create a for loop that iterates through an array and returns the sum of the elements of the array.
// B) Create a functional iterator for an array that returns each value of the array when called, one element at a time.
function sumFunc(arr) {
  // YOUR CODE HERE
  let idx = 0;
  let sum = 0;
  while (idx < arr.length) {
    sum += arr[idx];
    idx++;
  }

  return sum;
}

// Uncomment the lines below to test your work
// const array = [1, 2, 3, 4];
// console.log(sumFunc(array)); // -> should log 10

function returnIterator(arr) {
  // YOUR CODE HERE
  let idx = 0;
  return function iterator() {
    let value;
    while (idx < arr.length) {
      value = arr[idx];
      idx++;
      return value;
    }
  };
}

// Uncomment the lines below to test your work
// const array2 = ['a', 'b', 'c', 'd'];
// const myIterator = returnIterator(array2);
// console.log(myIterator()); // -> should log 'a'
// console.log(myIterator()); // -> should log 'b'
// console.log(myIterator()); // -> should log 'c'
// console.log(myIterator()); // -> should log 'd'

// Challenge 2
// Create an iterator with a next method that returns each value of the array when .next is called.

function nextIterator(arr) {
  // YOUR CODE HERE
  let idx = 0;
  function iterator() {
    let value;
    while (idx < arr.length) {
      value = arr[idx];
      idx++;
      return value;
    }
  }

  return { next: iterator };
}

// Uncomment the lines below to test your work
// const array3 = [1, 2, 3];
// const iteratorWithNext = nextIterator(array3);
// console.log(iteratorWithNext.next()); // -> should log 1
// console.log(iteratorWithNext.next()); // -> should log 2
// console.log(iteratorWithNext.next()); // -> should log 3

// Challenge 3
// Write code to iterate through an entire array using your nextIterator and sum the values.

function sumArray(arr) {
  // YOUR CODE HERE
  // use your nextIterator function
  let iterator = nextIterator(arr);
  let next = iterator.next();
  let sum = 0;

  while (next) {
    sum += next;
    next = iterator.next();
  }

  return sum;
}

// Uncomment the lines below to test your work
// const array4 = [1, 2, 3, 4];
// console.log(sumArray(array4)); // -> should log 10

// Challenge 4
// Create an iterator with a next method that returns each value of a set when .next is called

function setIterator(set) {
  // YOUR CODE HERE
  const nativeSetIterator = set.values();

  function iterator() {
    let next = nativeSetIterator.next();
    let value;

    while (next) {
      value = next.value;

      return value;
    }
  }

  return { next: iterator };
}

// Uncomment the lines below to test your work
// const mySet = new Set('hey');
// const iterateSet = setIterator(mySet);
// console.log(iterateSet.next()); // -> should log 'h'
// console.log(iterateSet.next()); // -> should log 'e'
// console.log(iterateSet.next()); // -> should log 'y'

// Challenge 5
// Create an iterator with a next method that returns an array with two elements (where the first element is the index and the second is the value at that index) when .next is called.

function indexIterator(arr) {
  // YOUR CODE HERE
  let idx = 0;
  function iterator() {
    let value;
    let result = [];
    while (idx < arr.length) {
      value = arr[idx];
      result.push(idx, value);
      idx++;
      return result;
    }
  }

  return { next: iterator };
}

// Uncomment the lines below to test your work
// const array5 = ['a', 'b', 'c', 'd'];
// const iteratorWithIndex = indexIterator(array5);
// console.log(iteratorWithIndex.next()); // -> should log [0, 'a']
// console.log(iteratorWithIndex.next()); // -> should log [1, 'b']
// console.log(iteratorWithIndex.next()); // -> should log [2, 'c']

// Challenge 6
// Create an iterator that returns each word from a string of words on the call of its .next method (hint: use regex!)
// Then attach it as a method to the prototype of a constructor Words. Hint: research Symbol.iterator!

function Words(string) {
  this.str = string;
}

Words.prototype[Symbol.iterator] = function () {
  // YOUR CODE HERE
  const tokens = this.str.split(" ");
  let idx = 0;
  function iterator() {
    const iteratorReturnObj = {};

    if (idx < tokens.length) {
      iteratorReturnObj.value = tokens[idx];
      iteratorReturnObj.done = false;
      idx++;

      return iteratorReturnObj;
    }
    iteratorReturnObj.value = undefined;
    iteratorReturnObj.done = true;
    return iteratorReturnObj;
  }

  return { next: iterator };
};

// Uncomment the lines below to test your work
// const helloWorld = new Words('Hello World');
// for (word of helloWorld) { console.log(word); } // -> should log 'Hello' and 'World'

// Challenge 7
// Build a function that walks through an array and returns the element concatenated with the string "was found after index x", where x is the previous index.
// Note: if it is the first element it should say that it is the first

function valueAndPrevIndex(array) {
  // YOUR CODE HERE
  let idx = 0;
  function iterator() {
    let value;
    let returnString = "";
    while (idx < array.length) {
      value = array[idx];
      if (idx == 0) {
        returnString = `first ${value}`;
        idx++;
        return returnString;
      }
      returnString = `${value} was found after ${idx}`;
      idx++;
      return returnString;
    }
  }

  return { sentence: iterator };
}

const returnedSentence = valueAndPrevIndex([4, 5, 6]);
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());

//CHALLENGE 8
// Write a function that will console.log "hello there", or "gibberish", every three seconds depending on if the word passed into the function is 'english'.
// Do not use any type of loop constructor and only make the call to createConversation once.
function* createConversation(string) {
  if (string == "english") {
    yield "hello there";
  }
  yield "gibberish";
}

function wrapper() {
  let str = "";
  if (Math.random() < 0.5) {
    str = "english";
  }
  console.log(createConversation(str).next());
}

setInterval(wrapper, 3000);

// Challenge 9 Don't think impl is as per question
// Use async/await to console.log a sentence comprised of a noun and verb in which the non async function takes in a noun, concatenates it with a hard coded verb and returns it to the async function to be console.logged after a duration of 3 seconds. Call the async function only once, feeding it a noun to make this happen.
function waitForVerb(noun) {
  return `${noun} plays`;
}

async function f(noun) {
  const fn = () => {
    console.log(waitForVerb(noun))
  }

  setTimeout(fn, 3000);
}

f("dog");