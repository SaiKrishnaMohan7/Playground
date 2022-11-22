import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: 'Not Authneticated' });

    return;
  }

  const [_, token] = bearer?.split(' ');

  if (!token) {
    res.status(401);
    res.json({ message: 'Not Authneticated' });

    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as Secret);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: 'Invalid token' });
  }
};