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

#### Boxing

Specical type of coercion (Implicit) that let's you access a property on a Primitive Value (Primitive to Object; ex: String.length)

#### Checking Equality

- == vs ===
  - Allows Coercion vs Doesn't Allow Coercion (Coerce to the comparing type and then check vs do NOT coerce and check)
  - `==` ONLY compares primitives. It will invoke `ToPrimitve` Abstract Operation, if the comparing types are a Primitive and an Object OR Object and a Primitive
  - `==` prefers Numeric Comparison
  - *if types are same they BOTH behave similarly*
  - Summary of ==
    - If the types are the same: ===
    - If null or undefined: equal
    - If non-primitives: ToPrimitive
    - Prefer: ToNumber
  - [Spec Link for Equality](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-abstract-equality-comparison)
  - AVOID
    - == with 0 or "" (or even " ")
    - == with non-primitives
    - == true or == false
--> *NOTE:* Look at the corner cases for this in src 2

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

- Closure: Closure is when a function “remembers” the variables outside of it, even if you pass that function elsewhere (Fucntion called outside of the lexical scope it is defined in)
  - Preserving access to a variable; Close over variables and NOT values (ex: Every render of react is a fucntion of that closes over the props at that time)
  - *Module Pattern*
    - Modules encapsulate data and behavior (methods) together. The state (data) of a module is held by its methods via closure
    - Modules are not like Factory functions, they are Singletons i.e. It runs once and done; When it runs again, you get access to the same instance
    - [JS Patterns](https://static.frontendmasters.com/resources/2019-03-07-deep-javascript-v2/deep-js-foundations-v2.pdf) --> Understand what's up here
      - [Code Sample](JS/VanillaJs/deep-js-foundations-v2-exercises/scope-exercises/modules/ex.fixed.js)

```javascript
function ask(question) {
  // `question` doesn't get garbage collected even after `ask()` is doen running since `question` is still being referred by `waitASec` and hence keeping the closure alive
  setTimeout(function waitASec() {
    console.log(question);
  }, 1000)
}

ask('Kya aap Colgate karte hain?');
```

- A function expression will have its *own scope* while function declarations will attach itseld to the scope it is defined in (enclosing scope).
  - Named vs Anonymous Function Expressions
    - _Always prefer *Named fucnti0on expression*_: To have a reliable reference, Better Stack Trace, Self-Documenting code!

- Lexical and Dynamic Scope
  - bash is Dynamically scoped
  - Lexical Scope (fixed, predictable) is at author time, doesn't chnage when being compiled

- A case to use `var` instead of a `let`

```javascript
function(searchStr) {
  // I could declare `id` outside of try {}
  try {
    var id = getRecord(searchStr);
  }
  catch {
    var id = -1;
  }

  return id;
}
```

- use `const` with primitive, immutable values (let someArr = Object.freeze([contentsOfSomeArr]))

- `let` and `const` Hoisting: (You get a TDZ error if you try and access before the variable is lexically bound)

  - let and const declarations define variables that are scoped to the running execution context's LexicalEnvironment. The variables are created when their containing Lexical Environment is instantiated but may not be accessed in any way until the variable's LexicalBinding is evaluated. A variable defined by a LexicalBinding with an Initializer is assigned the value of its Initializer's AssignmentExpression when the LexicalBinding is evaluated, not when the variable is created. If a LexicalBinding in a let declaration does not have an Initializer the variable is assigned the value undefined when the LexicalBinding is evaluated.

### this keyword and Prototypes

- `this`:
  - A function's `this` references the execution context for that call, determined entirely by how the function was called
    - `this` points to a _context_ and NOT the function. Therefore, `var context = this;` better reflects that concept than `var self = this;`
  - A this-aware function can thus have a different context each time it's called, which makes it more flexible & reusable
  - `this` is also flexible! It is JS's way of implementing *Dynamic Scope*
  - `this` determination, `this` binding precedence
    1. Is the function called by new?
    2. Is the function called by call() or apply()?
        Note: bind() effectively uses apply()
    3. Is the function called on a context object?
    4. DEFAULT: global object (except strict mode)

  - An arrow function does not have a `this` at all, so this ---> *An arrow function is this-bound (aka .bind()) to its parent function* is not accurate
    - From the spec, most accurate description
      _An ArrowFunction does not define local bindings for arguments, super, this, or new.target. Any reference to arguments, super, this, or new.target within an ArrowFunction must resolve to a binding in a lexically enclosing environment. Typically this will be the Function Environment of an immediately enclosing function. Even though an ArrowFunction may contain references to super, the function object created in step 4 is not made into a method by performing MakeMethod. An ArrowFunction that references super is always contained within a non-ArrowFunction and the necessary state to implement super is accessible via the scope that is captured by the function object of the ArrowFunction._
    - *An arrow function doesn't define a this, so it's like any normal variable, and resolves lexically (aka "lexical this"*
    - _Only use => arrow functions when you need lexical `this`_

```javascript

  var workshop = {
    teacher: 'Kyle',
    ask : question => {
      // this is bound to global object and not workshop since workshop's {} DO NOT represent a scope!
      console.log(this.teacher, question);
    },
  };

  workshop.ask('What is happening to this?');
  workshop.ask.call(workshop, 'What is happening to this? Still no this?');
```

```javascript

  var workshop = {
    teacher: 'Kyle',
    ask (question) {
      console.log(this.teacher, question);
    }
  };

// Implicit bind rule: workshop is being implicitly bound to `this` when calling `ask` on `workshop` (namespace pattern)
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

```javascript
var workshop = {
  teacher: 'Kyle',
  ask(question) {
    console.log(this.teacher, question);
  }
};

setTimeout(workshop.ask, 10, 'Lost this?'); // undefined Lost this?
// Hard bind rule (Hard bind invocation)
setTimeout(workshop.ask.bind(workshop), 10, 'Hard bound this?'); // Kyle Hard bound this?

```

```javascript
function ask(question) {
    console.log(this.teacher, question);
  }

// Another way of invoking a fucntion
var newEmptyObject = new ask('What is "new" doing here?');
```

- What `new` does:
  - Create a brand new empty object
  - Link that object to another object (*)
  - Call function with this set to the new object (not the linked oibject but the new object from step 1)
  - If function does not return an object,
  assume return of this

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
- [Mini Src_Deep](https://static.frontendmasters.com/resources/2019-03-07-deep-javascript-v2/deep-js-foundations-v2.pdf)
- [Language Spec](https://www.ecma-international.org/ecma-262/9.0/index.html#Title)
