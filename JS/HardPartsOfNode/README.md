# Hard Parts of node and servers

Node, a tool to use the underlying Networking, Filesystem and other internal features of a computer via C++ (Node) with code written in JS to do what we want or react to an event

- 1 - 64000 diff numbers to represent an entry point (port) into the computer for communication
- Any task that is going to take a long time to run, JS is not going to wait around for it to finish running or have any kind of activity and hence such a task is setup in Node with a fucntion attached to it so that Node can run (execute) that fucntion (in JS's context while supplying it args, which are JS objects) automatically when the task finishes or there's some sort of activity there
  - The middleware pattern (express) parses the autocreated JS objects by Node in fucntions step by step while doing something to that object at each step, say for ex, is the user logged in (checks for a logged in cookie), check what the url is etc. Its only job is to modularize what you want to do to the incoming data

- Which IO in node sets up a thread and which deosn't? FS does and http doesn't
- Fucntion on tops of the callStack is the fucntion that is runnning
- Always in the call stack will `global` that nig fucntion that wraps everything (All the node code) and runs it
- Data comes in chunks (by default, chunk size is 64kb) when we say stream. The chunk is of type Buffer (0s and 1s)

Watch again: Asynchronocity in Node (Event loop section in Distributed systems in Node), Streams.Checking cb queue
