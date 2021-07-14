# Chapter-1 Summary by Sai; Book Thomas Hunter II

- *JS as a language is transitioning from being a single-threaded language to a multi-threaded language*
  - **Atomics** object provides a mech to coordinate comms across threads
  - **SharedArrayBuffer** can be written to aand read from across threads

- Frame added to call stack - everytime a fucntion calls another function
  - **RangeError: Maximum CallStack size exceeded** - Max lim of frames in a call stack reached
  - **Node 14 - Max callstack size is > 15000 frames**

- **EventLoop** (pg 4-6)
  - Concurrency in JS - EventLoop
  - Manages a queue of events that are used to trigger callbacks (cb) and move the app along
  - EventLoop checks for more work to **only once a stack is complete**
  - takes non-zero amount of time to check for more work to do
  - a long running fucntion *blocks the Event Loop*
  - [Different phases of Event Loop and queues in each phase and how they fucntion](https://github.com/SaiKrishnaMohan7/Playground/blob/master/JS/DistributedSystemsInNodeJs/Chapter_1/event_loop_phases.js)
  - 2 call stacks *won't* exist at the same time - 2 fucnctions *cannot* run in parallel
    - App scaling then?
      - Run multiple copies of the same code (VMs, containers)
      - *`cluster` Module* - route incoming HTTP reqs to diff app instances
      - *`worker_threads` Module* - Run multiple JS instnaces at once
      - *`child_process` Module* - Spawn and manage multiple JS instances
  - The above is still running single line of JS at a time
    - Objects cannot be shared between isolated JS instances with the above
      - **Solution**: Message Passing, share serialized representation of object b/w instances
      - **How?**
        - use *worker_threads*
        - create instace of *SharedArrayBuffer*
        - pass from one thread to another using *postMessage(instanceOfSharedArrayBuffer)*
        - Array of object bytes that both threads can read and write to

- The JS part of Node is *Userland*
- *LibUV*
  - Multithreaded part of node (Userland relies on this to manage thread pools for I/O operations and CPU haeavy tasks)
  - default threadpool size: 1024; configured via `UV_THREADPOOL_SIZE=<threads>`

- `.ref() and .unref()`
  - Keep process alive v/s don't
- `setTimeout()` in browser returns number, in Node returns an object with methods attached to it just like most NodeJS APIs
  - the methods in that returned object gives userland contol over compter internals (links strongly THP Node Will Sentance)
  - ref and unref are two such methods
  - Think, when we run `fs.readFile()` or run `http.createServer()`, these NodeAPIs are giving you direct control over computer internals, the case of http module, a network socket!

- **Event Loop Tips**
  - *Don't starve the event loop*
    - Break CPU heavy operations across different stacks
      - ex: for processing 1000 records, break into batches of 10, use `setImmediate()` at the end of each to continue processing
    - DO NOT USE `nextTick` for this, the microtask queue (first) will *never* empty, no RangeError will be thrown and the process will be a zombie process that will eat through CPU
  - a fucntion passed to `setImmediate()` runs in the *next* iteration of the event loop (next tick) and the fucntion passed to `nexTick()` will run during the *same* iteration of the event loop (opposite of name)

  - *Don't introduce Zalgo*
    - If a fn accepts cb, that cb should always run asynchronously

    ```javascript
      function foo(count, cb) {
        if (count <=0) {
          return callback(new TypeError('count should be > 0')); // synch
        }

        myCustomAsyncOperation(count, callback); // asynch
      }
    ```

    INSTEAD

    ```javascript
      function foo(count, cb) {
        if (count <=0) {
          return process.nextTick(() => callback(new TypeError('count should be > 0'))); // asynch! Run in the same iteraion of the event loop
        }

        myCustomAsyncOperation(count, callback); // asynch
      }
    ```
