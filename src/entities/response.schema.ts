import Joi from 'joi';

export interface OkResponse {
  ok: boolean;
}

export interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
}

export const okResponseSchema = Joi.object({
  ok: Joi.boolean().required()
}).label('OkResponse');

export const errorResponseSchema = Joi.object({
  statusCode: Joi.number().required(),
  error: Joi.string().required(),
  message: Joi.string().required()
});
