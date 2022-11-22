import { merge } from 'lodash';

// make sure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const env = process.env.STAGE || "local";
let envConfig;

// dynamically require each config depending on the stage we're in
if (env === "production") {
  envConfig = require("./prod").default; // for interop between es6module system and the commonjs module system
} else if (env === "staging") {
  envConfig = require("./staging").default;
} else {
  envConfig = require("./local").default;
}

const defaultConfig = {
  env,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  logging: false,
};

export default merge(defaultConfig, envConfig);