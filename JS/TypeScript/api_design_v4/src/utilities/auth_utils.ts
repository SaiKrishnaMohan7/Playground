import { User } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createJWT = (user: User) => {
  const token = jwt.sign({
    id: user.id,
    username: user.username,
  }, process.env.JWT_SECRET as Secret);

  return token;

};

export const comparePasswords = (plaintextPassword: string, hashedPassword: string) => {
  return bcrypt.compare(plaintextPassword, hashedPassword);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5); // the salt should be a random number taht should stored in an env var on the server
};
