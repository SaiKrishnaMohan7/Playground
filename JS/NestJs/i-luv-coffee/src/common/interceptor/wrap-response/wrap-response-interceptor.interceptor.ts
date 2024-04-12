import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * Interceptors in NestJS are used to:
 * bind extra logic before or after method execution
 * transform the result returned from a method
 * transform the exception thrown from a method
 * extend basic method behavior
 * or even completely overriding a method - depending on a specific condition (for example: doing something like caching various responses)
 */
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Returns a rxjs observable, which is a way of handling async operations without using callbacks or Promises
    return next.handle().pipe(map((data) => ({ data })));
  }
}

/*
RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using Observables,
to make it easier to compose asynchronous or callback-based code.

Observables are a concept where you observe a data stream and react to changes or updates in that stream.
They are similar to Promises but with a few key differences:

- Observables can handle multiple values over time, whereas Promises will only handle a single value once and then cannot be reused.
- Observables are lazy, meaning they are not executed until a subscription is made. Promises, on the other hand, are eager and will execute immediately upon creation.
- Observables have operators like `map`, `filter`, `reduce`, etc. that allow powerful operations to be performed on data streams.

In relation to the event loop, Observables are non-blocking just like Promises and callbacks.
They allow you to perform operations asynchronously without blocking the event loop.

Iterators in JavaScript are a way to sequence through a collection. Observables are similar in that they sequence through data over time.
However, while iterators pull values from a collection, Observables push data to the observer.
*/

/*
Observables and Node.js streams are both constructs for handling data over time, but they have some differences.

Node.js streams are a built-in data handling method in Node.js, and they come in three forms: Readable, Writable, and Duplex/Transform streams.
A Transform stream is a type of Duplex stream that can modify or transform the data as it is written and read.

Observables, on the other hand, are part of the RxJS library and can be used to handle any asynchronous data, not just I/O operations.
They can be thought of as a more powerful version of Node.js streams, with additional operations like `map`, `filter`, `reduce`, etc.

Event Emitters are a design pattern that allows an object to notify other objects when something has occurred.
Node.js streams actually use Event Emitters under the hood to notify when data is available to read, or when it's okay to write more data.

The main difference between Observables and Event Emitters is that Observables can be manipulated and transformed in a way that Event Emitters can't.
Observables also support operators like `map`, `filter`, `reduce`, etc., and they can be unsubscribed from, which stops the stream of data.
*/

/*
In Express.js, middleware functions are used to perform operations on the request and response objects.
They can modify the request/response, end the request-response cycle, or pass control to the next middleware function in the stack.

The `intercept` method in the `WrapResponseInterceptor` class in NestJS is similar to an Express middleware function.
It intercepts the response from a route handler, transforms it, and then sends it to the client.

However, one key difference is that NestJS interceptors are more powerful and flexible than Express middleware.
They can manipulate the data returned from route handlers, while Express middleware can only manipulate the request and response objects.
*/
