import { Request, Response, NextFunction } from 'express';

// Better when no dependencies are needed
export const functionalMiddlware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('I am a functional middleware');
  next();
};
