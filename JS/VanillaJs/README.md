# The JS Corner: Rambling, brain bending and understanding JS

Follows The YDKJS series by Kyle Simpson

## The Three Pillars of JS

### Types and Coercions

"In JavaScript, everything is an object." FALSE

#### Primitive Types

- undefined (variable created but not assigned or something never created)
- String
- Number
- Boolean
- Object: can be "instantiated" using `new` (!new!)
- Symbol (ES6)

- null (Object.... A bug in JS)
- Function: subtype of object but typeof returns function; (!new!)
- Array: subtype of object; (!new!)
- Date: (!new!)
- RegExp: (!new!)
- Error: (!new!)

- NaN (result of an invalid numeric operation) -- "I am a random string" / 2 will give NaN; JS tries to coerce the string to a number but fails since it can't be done

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
- Closure

### this keyword and Prototypes
