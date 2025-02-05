import Joi from 'joi';
import {
  itemIdSchema,
  createItemSchema,
  updateItemSchema,
} from '@/validations/items.validations';

interface WithLabel {
  label: string;
}

describe('itemIdSchema', () => {
  it('should validate a valid item ID input', () => {
    const input = { id: 'abc123' };
    const { error, value } = itemIdSchema.validate(input);
    expect(error).toBeUndefined();
    expect(value).toEqual(input);
  });

  it('should fail validation when "id" is missing', () => {
    const input = {};
    const { error } = itemIdSchema.validate(input);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toContain('"id" is required');
  });

  it('should have the label "ItemIdInput"', () => {
    const desc = itemIdSchema.describe();
    expect((desc.flags as WithLabel)?.label).toBe('ItemIdInput');
  });
});

describe('createItemSchema', () => {
  it('should validate a valid create item input', () => {
    const input = { name: 'Test Item', price: 10.5 };
    const { error, value } = createItemSchema.validate(input);
    expect(error).toBeUndefined();
    expect(value).toEqual(input);
  });

  it('should fail validation when "name" is missing', () => {
    const input = { price: 10.5 };
    const { error } = createItemSchema.validate(input);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Field "name" is required');
  });

  it('should fail validation when "name" is empty', () => {
    const input = { name: '', price: 10.5 };
    const { error } = createItemSchema.validate(input);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Field "name" is required');
  });

  it('should fail validation when "price" is missing', () => {
    const input = { name: 'Test Item' };
    const { error } = createItemSchema.validate(input);
    expect(error).toBeDefined();
    // Expect the required message for a missing price.
    expect(error?.details[0].message).toBe('Field "price" is required');
  });

  it('should fail validation when "price" is not a number', () => {
    const input = { name: 'Test Item', price: 'not a number' };
    const { error } = createItemSchema.validate(input);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Field "price" must be a number');
  });

  it('should fail validation when "price" is negative', () => {
    const input = { name: 'Test Item', price: -5 };
    const { error } = createItemSchema.validate(input);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Field "price" cannot be negative');
  });

  it('should have the label "CreateItemInput"', () => {
    const desc = createItemSchema.describe();
    expect((desc.flags as WithLabel)?.label).toBe('CreateItemInput');
  });
});

describe('updateItemSchema', () => {
  it('should validate a valid update item input', () => {
    const input = { name: 'Updated Item', price: 20 };
    const { error, value } = updateItemSchema.validate(input);
    expect(error).toBeUndefined();
    expect(value).toEqual(input);
  });

  it('should fail validation when "name" is missing', () => {
    const input = { price: 20 };
    const { error } = updateItemSchema.validate(input);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Field "name" is required');
  });

  it('should fail validation when "name" is empty', () => {
    const input = { name: '', price: 20 };
    const { error } = updateItemSchema.validate(input);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Field "name" is required');
  });

  it('should fail validation when "price" is missing', () => {
    const input = { name: 'Updated Item' };
    const { error } = updateItemSchema.validate(input);
    expect(error).toBeDefined();
    // Expect the required message for a missing price.
    expect(error?.details[0].message).toBe('Field "price" is required');
  });

  it('should fail validation when "price" is not a number', () => {
    const input = { name: 'Updated Item', price: 'invalid' };
    const { error } = updateItemSchema.validate(input);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Field "price" must be a number');
  });

  it('should fail validation when "price" is negative', () => {
    const input = { name: 'Updated Item', price: -1 };
    const { error } = updateItemSchema.validate(input);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Field "price" cannot be negative');
  });

  it('should have the label "UpdateItemInput"', () => {
    const desc = updateItemSchema.describe();
    expect((desc.flags as WithLabel)?.label).toBe('UpdateItemInput');
  });
});
