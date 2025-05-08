import { Injectable, NestMiddleware } from '@nestjs/common';

// pipes, interceptors and middleware are all middlewares

// This class based middleware, better to use function based middleware when dependencies are not needed
// this means no injectatble decorator
@Injectable()
export class ReqLoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');
    console.log('Woooo');

    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
