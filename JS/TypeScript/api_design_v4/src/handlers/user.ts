import { User } from "@prisma/client";
import { Request, Response } from "express";
import { createJWT, hashPassword,comparePasswords } from "../utilities/auth_utils";
import dbClient from '../utilities/db';

export const createUser = async (req: Request, res: Response) => {
  const user = await dbClient.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
      createdAt: '3',
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req: Request, res: Response) => {
  const user = await dbClient.user.findUnique({
    where: {
      username: req.body.username,
    }
  });

  const isValid = await comparePasswords(req.body.password, user?.password as User['password']);

  if (!isValid) {
    res.status(401);
    res.json({ message: 'Failed to authentcate' });
  }
};

// process.on() error handling can be thought of as handling system level errors, errors from the Node runtime and not from express