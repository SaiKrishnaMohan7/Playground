import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  TimeoutError,
  catchError,
  throwError,
  timeout,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
      }),
    );
  }
}

/**
 * Express equivalent
 * function timeout(time) {
  return function(req, res, next) {
    var timer = setTimeout(() => {
      req.timedout = true;
      var err = new Error('Request Timeout');
      err.status = 503;
      next(err); // Throw a specific error so that this can be handled in the global error handler and appropriate response can be sent
    }, time);

    // Clear the timer when the request finishes
    res.on('finish', function() {
      clearTimeout(timer);
    });

    next();
  }
}
 */
