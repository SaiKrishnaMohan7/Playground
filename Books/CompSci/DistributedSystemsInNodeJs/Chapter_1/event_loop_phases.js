/**
  Check these too: https://github.com/SaiKrishnaMohan7/Playground/blob/master/JS/NewHardParts/README.md
  https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
  https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

 * Phases in the nodejs event loop; Page 11
 *
 * a `tick` is a complete pass through the event loop (`setImmediate` takes a full tick to run while `nextTick` is more immediate)
 *
 * Each of these phases maintains a queue of callbacks (cb); The event loop goes through all these phases till there are no more cbs
 * to be executed and chills in the Poll phase (if I/O operations haven't finished yet or exit)
 *
 * Poll - executes and holds I/O related cbs; Main app code runs in this phase
 * Check - cbs triggered by setImmediate
 * Close - cbs triggered by EventEmitter `close` events
 * Timers - cbs scheduled using setTimeout and setInterval
 *  - Fns get in the Timers cb queue after the timer has lapsed for setTimeout (run the given fn anytime after the time passed in has lapsed) and will be allowed on the call stack only after the all the synchronous is done
 *  - Fns are added to the Timers cb queue after the timer has lapsed for setInterval (keep running passed in fn after waiting minimum passed in time) and will be allowed on the call stack only after the all the synchronous is done
 * Pending - Special system events, like ECONNREFUSED, EADDRINUSE etc
 *
 * Microtask queues - Cbs here take priority over the cbs in the Phase queues (Checked by Event Loop between every phase; Call stack should be empty)
 *
 * first microtask queue - cbs registered using process.nextTick()
 * second microtask queue - cbs registered using Promises (reject or resolve)
 *
 * Execution of below program in the above context:
 *
 * - Starts executing line by line in the poll phase's queue
 * - setImmediate is run, cb1 to check phase's queue
 * - Promise resolves, cb2 to Promise microtask queue
 * - nextTick runs, cb3 to nextTick microtask queue
 * - fs.readFile runs, asks NodeAPI to read a file and places cb4 in the Poll phase's queue
 * - clg prints 8 to the console (8)
 *
 * At this point the fucntions are now in the call stack and now the execution will begin
 *
 * - The first microtask queue, the nexTick queue, is checked; cb3 is now executed (3)
 * - The second microtask queue, the Promise queue, is checked; cb2 is now executed (2)
 *
 * Poll phase ends, event loop moves to Check phase
 *
 * - cb1 is now executed (1)
 *
 * Nothing to do in the Close Phase, moves on to Timers phase, nothing to do, moves on to Pending phase,
 * nothing to do, back to Poll phase and wait for the NodeAPI to finish reading the file
 *
 * - cb4 is now run (file has been read now!) (prints 4)
 * - cb5 pushed to the Timers queue
 * - cb6 pushed to the Check queue
 * - cb7 pushed to first microtask queue
 *
 * Poll queue is now done, checks microtask queues
 *
 * - cb7 is now executed (7)
 *
 * Nothing to do in the second microtask queue (Promise)... Poll Phase Ends, event loop enters Check phase
 *
 * - cb6 is now executed (6)
 *
 * Check queue is finished, microtask queues are empty, Check phase ends... Proceeds to Timers phase, checks Timers queue
 *
 * - cb5 is now executed (5)
 *
 * Timers queue empty, Timers phase ends, enters Close phase, Close queue empty, Close phase ends, enters Pending phase, nothign to do.
 * There's now no more work to be done, exit program
 *
 *
 */
const fs = require('fs');

setImmediate(() => {
  console.log(1);
});

Promise.resolve(() => {
  console.log(2);
});

process.nextTick(() => {
  console.log(3);
});

fs.readFile(__filename, () => {
  console.log(4);
  setTimeout(() => {
    console.log(5);
  });
  setImmediate(() => {
    console.log(6);
  });
  process.nextTick(() => {
    console.log(7);
  });
});

console.log(8);