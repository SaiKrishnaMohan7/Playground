# The JS Corner: Rambling, brain bending and understanding JS

Follows The YDKJS series by Kyle Simpson

## The Three Pillars of JS

### Types and Coercions

"In JavaScript, everything is an object." - FALSE
Most values can _behave_ like objects but that deosn't necessarily mean they are objects

#### Primitive Types

- undefined (variable created but not assigned or something never created; Historic; Temporal Dead Zone (TDZ, uninitialised, ES6))
- String
- Number
- Boolean
- Object: can be "instantiated" using `new` (!new!)
- Symbol (ES6)

- null (Object.... A bug in JS; Historic)
- Function: subtype of object but typeof returns function; ; Historic; (!new!)
- Array: subtype of object; (!new!)
- Date: (!new!)
- RegExp: (!new!)
- Error: (!new!)

- NaN (result of an invalid numeric operation) -- "I am a random string" / 2 will give NaN; JS tries to coerce the string to a number but fails since it can't be done
  - Not a valid representation of a number; IS a number jnust not a valid one, IEEE 754
  - NaN's are never equal to themselves
  - `isNaN` checks if a value is NaN by coercing the passed value to a number
  - `Number.isNaN` tells exactly if a vlaue is NaN or not

- Special Value -> -0
  - IEEE 754
  - `Object.is()`

--> String, Number, Boolean are best used as fucntions. Though, it is possible to instantiate them with the `new` keyword.

#### Abstract Operations

-[Spec Link](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-abstract-operations)

- `ToPrimitive(input[,hint])` is an algorithm that is in the ECMAScript spec, used to convert a non-promitive type to a primitive ex: Object to String
  - `hint is Number` => `.valueOf()`, `.toString()` <--consultation order
  - `hint is String` => `.toString()`, `.valueOf()`
  - Type Coercion happens through this algo
- Empty strings get coreced 0 (ToNumber)

#### Converting Types

```javascript
  // Yuck, but it is a thing
  var num = 16;
  console.log(`There are ${num+""} students.`)
```

#### Checking Equality

- == vs ===
  - Allows Coercion vs Doesn't Allow Coercion (Coerce to the comparing type and then check vs do NOT coerce and check)
  - if types are same they BOTH behave similarly

### Scope and Closures

- Nested Scope
- IIFEs used for protecting scope or preventing scope pollution. Better solved by block scoping (let, const)

```javascript
// Will probably never use it
function() {
  // an exclusive let block
  {
    let prefix, rest;
    prefix = str.slice(0, 3);
    rest = str.slice(3);
    str = prefix.toUpperCase() + rest;
  }

  if (/^FOO:/.test(str)) {
    return str;
  }

  return str.slice(4);
}
```

- Closure: Closure is when a function “remembers” the variables outside of it, even if you pass that function elsewhere.

```javascript
function ask(question) {
  // `question` doesn't get garbage collected even after `ask()` is doen running since `question` is still being referred by `waitASec` and hence keeping the closure alive
  setTimeout(function waitASec() {
    console.log(question);
  }, 1000)
}

ask('Kya aap Colgate karte hain?');
```

### this keyword and Prototypes

- this:
  - A function's `this` references the execution context for that call, determined entirely by how the function was called.
  - A this-aware function can thus have a different context each time it's called, which makes it more flexible & reusable

```javascript

  var workshop = {
    teacher: 'Kyle',
    ask (question) {
      console.log(this.teacher, question);
    }
  };

// Implicit bind rule: workshop is being implicitly bound to `this` when calling `ask` on `workshop`
  workshop.ask('What is implicit binding?');
```

```javascript
function ask(question) {
  console.log(this.teacher, question);
}

function otherClass() {
  var myContext = {
    teacher: 'Suzy'
  };

  // Explicit bind rule: explcitly binding myContext to `this` when calling `ask`
  ask.call(myContext, 'Why?');
}

otherClass();
```

- Prototypes
  What the `class` keyword does internally

  ```javascript
    // acts a constructor
    function Workshop(teacher) {
      this.teacher= teacher;
    }

    Workshop.prototype.ask = function(question) {
      console.log(this.teacher, question);
    };

    var deepJS = new Workshop('Kyle');
    var reactJS = new Workshop('Suzy');

    // `this` is bound to deepJS implicitly
    deepJS.ask('blahahaaaa?');

    reactJS.ask('React?');
  ```

- [Mini Src](https://static.frontendmasters.com/resources/2019-05-08-getting-into-javascript/getting-into-javascript.pdf)
- [Mini Src_2](https://static.frontendmasters.com/resources/2019-03-07-deep-javascript-v2/deep-js-foundations-v2.pdf)
- [Language Spec](https://www.ecma-international.org/ecma-262/9.0/index.html#Title)
