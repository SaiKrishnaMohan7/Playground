# JS New Hard Parts - Asynchronousity in JS and New Features of the language

## Asynchronousity in JS

- Defer certain functionality only to be allowed back in to JS the when two conditions are satisfied:
  - The global execution context is done running all the code (synchronous) it wanted to run
  - The call stack is empty
- Event loop checks the cb queques (macrotask queue) if there's anything to be allowed back into the call stack for execution and allows it back onto the call stack only when the above two conditions are satisfied
- setTimeout and setInterval don't do anything JS, all of it is happening in the computer land outside the browser but by interacting with it via Browser APIs

- Promises add readability enhancement to JS and immediately returns a Promise object with a
  - `value` - When the backgropund async process is done and is successful, this key is set with that value
  - `onFulfilment`- An array that holds the function be called when we get data or promise is fulfilled
  - `status` - `resolve, reject, Pending`; When this value transitions from `Pending` to `resolved` the fns in the `onFulfilment` array are called
  - `onRejected` - An array that holds fns to call when there's a rejection i.e. `status` changes from `Pending` to `Rejected`
  - When we call `.then(someFnToBeCalledWithData)` method on the Promise object, it pushes the function that we passed into the
`onFulfilment` array.
  - When we call `.then(fnToRunOnPromiseSucces, fnToRunOnPromiseRject)` or `.catch(fnToRunOnPromiseRject)` will place these fns in the `onRejected` array
