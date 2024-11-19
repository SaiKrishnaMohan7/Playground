import { ReqLoggingMiddleware } from './req-logging.middleware';

describe('ReqLoggingMiddleware', () => {
  it('should be defined', () => {
    expect(new ReqLoggingMiddleware()).toBeDefined();
  });
});
