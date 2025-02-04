import { ServerRoute } from '@hapi/hapi';
import * as controller from '../controllers/items.controller';
import * as validations from '../validations/items.validations';
import { validationFailAction } from '../validations/validations';
import { itemListSchema, itemSchema } from '../entities/item.entity';
import { okResponseSchema } from '../entities/response.schema';

export const itemRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/items',
    options: {
      handler: controller.getAllItems,
      description: 'Get all items',
      notes: 'Get all items in the database',
      tags: ['api', 'items'],
      response: { schema: itemListSchema }
    }
  },
  {
    method: 'GET',
    path: '/items/{id}',
    options: {
      handler: controller.getItem,
      description: 'Get an item by ID',
      notes: 'Get an item by its ID',
      tags: ['api', 'items'],
      response: { schema: itemSchema },
      validate: {
        params: validations.itemIdSchema,
        failAction: validationFailAction
      }
    }
  },
  {
    method: 'POST',
    path: '/items',
    options: {
      handler: controller.createItem,
      description: 'Create a new item',
      notes: 'Create a new item with a name and a description',
      tags: ['api', 'items'],
      response: { schema: itemSchema },
      validate: {
        payload: validations.createItemSchema,
        failAction: validationFailAction
      }
    }
  },
  {
    method: 'PUT',
    path: '/items/{id}',
    options: {
      handler: controller.updateItem,
      description: 'Update an item',
      notes: 'Update an item by its ID',
      tags: ['api', 'items'],
      response: { schema: itemSchema },
      validate: {
        params: validations.itemIdSchema,
        payload: validations.updateItemSchema,
        failAction: validationFailAction
      }
    }
  },
  {
    method: 'DELETE',
    path: '/items/{id}',
    options: {
      handler: controller.deleteItem,
      description: 'Delete an item',
      notes: 'Delete an item by its ID',
      tags: ['api', 'items'],
      response: { schema: okResponseSchema },
      validate: {
        params: validations.itemIdSchema,
        failAction: validationFailAction
      }
    }
  }
];