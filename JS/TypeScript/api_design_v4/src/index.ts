import * as dotenv from "dotenv";
dotenv.config(); // load the all the env vars so that we can use process.env

import app from './server';

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});