import * as joi from 'joi';
import * as dotenv from 'dotenv';

dotenv.config();

const configSchema = joi.object({
  NODE_HOST: joi.string().required(),
  NODE_PORT: joi.number().required(),
  DB_NAME: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required()
}).unknown(true);

const { error } = configSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
