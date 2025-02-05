import Joi from 'joi';
import * as dotenv from 'dotenv';

dotenv.config();

const configSchema = Joi.object({
  NODE_HOST: Joi.string().required(),
  NODE_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required()
}).unknown(true);

const { error } = configSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
