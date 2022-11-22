import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { createUser, signIn } from './handlers/user';
import { authenticate } from './middleware/authn';

import router from './router';

const app = express();

// Middlewares

// Logging
app.use(morgan('dev'));

// enable json in req body
app.use(express.json());

// decoding and encoding query strings
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200);
  res.json({ message: 'hello'});
});

app.use('/api', authenticate, router);

app.post('/user', createUser);
app.post('/signin', signIn);

export default app;