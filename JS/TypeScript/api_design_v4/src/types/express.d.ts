import jwt from 'jsonwebtoken';
export {};

declare global {
  namespace Express {
    interface Request {
      user: string | jwt.JwtPayload;
    }
  }
}
