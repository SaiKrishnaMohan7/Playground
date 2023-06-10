import * as Joi from '@hapi/joi';

export const configurationValidationSchema = Joi.object({
  ENV: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_UN: Joi.string().required(),
  DB_PW: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
