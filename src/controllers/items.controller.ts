import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Item } from '../entities/item.entity';
import { OkResponse } from '../entities/response.schema';
import { appDataSource } from '../config/database';

const itemRepository = appDataSource.getRepository(Item);

export const getAllItems = async (_request: Request, h: ResponseToolkit):
  Promise<ResponseObject | Boom.Boom<unknown>> => {
  try {
    const items = await itemRepository.find();
    return h.response(items).code(200);
  } catch (error) {
    console.error('Error fetching items: ', error);
    return Boom.internal('Internal Server Error');
  }
};

export const getItem = async (request: Request, h: ResponseToolkit):
  Promise<ResponseObject | Boom.Boom<unknown>> => {
  try {
    const { id } = request.params;
    const idNumber = parseInt(id, 10);
    const item = await itemRepository.findOneBy({ id: idNumber });

    if (!item) {
      return Boom.notFound('Item not found');
    }

    return h.response(item).code(200);
  } catch (error) {
    console.error('Error fetching item: ', error);
    return Boom.internal('Internal Server Error');
  }
};

export const createItem = async (request: Request, h: ResponseToolkit):
  Promise<ResponseObject | Boom.Boom<unknown>> => {
  try {
    const itemData = request.payload as Partial<Item>;
    const newItem = itemRepository.create(itemData);
    const savedItem = await itemRepository.save(newItem);
    return h.response(savedItem).code(201);
  } catch (error) {
    console.error('Error creating item: ', error);
    return Boom.badRequest('Invalid item data');
  }
};

export const updateItem = async (request: Request, h: ResponseToolkit):
  Promise<ResponseObject | Boom.Boom<unknown>> => {
  try {
    const { id } = request.params;
    const idNumber = parseInt(id, 10);
    const itemData = request.payload as Partial<Item>;

    await itemRepository.update(idNumber, itemData);
    const updatedItem = await itemRepository.findOneBy({ id });

    if (!updatedItem) {
      return Boom.notFound('Item not found');
    }

    return h.response(updatedItem).code(200);
  } catch (error) {
    console.error('Error updating item: ', error);
    return Boom.badRequest('Invalid update data');
  }
};

export const deleteItem = async (request: Request, h: ResponseToolkit):
  Promise<ResponseObject | Boom.Boom<unknown>> => {
  try {
    const { id } = request.params;
    const idNumber = parseInt(id, 10);

    const result = await itemRepository.delete({ id: idNumber });
    const success = result.affected === 1;

    if (!success) {
      return Boom.notFound('Item not found');
    }

    const response: OkResponse = { ok: success };
    return h.response(response).code(204);
  } catch (error) {
    console.error('Error deleting item: ', error);
    return Boom.internal('Internal Server Error');
  }
};
