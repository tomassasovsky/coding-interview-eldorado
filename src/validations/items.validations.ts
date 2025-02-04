import Joi from 'joi';

export const itemIdSchema = Joi.object({
    id: Joi.string().required().description('ID of the item'),
}).label('ItemIdInput');

export const createItemSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Field "name" is required',
        'any.required': 'Field "name" is required',
    }).description('Name of the item').label('Name'),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Field "price" must be a number',
        'any.required': 'Field "price" is required',
        'number.min': 'Field "price" cannot be negative'
    }).description('Price of the item').label('Price'),
}).label('CreateItemInput');

export const updateItemSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Field "name" is required',
        'any.required': 'Field "name" is required',
    }).description('Name of the item').label('Name'),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Field "price" must be a number',
        'any.required': 'Field "price" is required',
        'number.min': 'Field "price" cannot be negative'
    }).description('Price of the item').label('Price'),
}).label('UpdateItemInput');
