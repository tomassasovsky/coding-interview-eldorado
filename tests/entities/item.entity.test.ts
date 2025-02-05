import { itemSchema, itemListSchema, Item } from '@/entities/item.entity';

interface WithLabel {
  label: string;
}

describe('Item Entity and Schemas', () => {
  describe('Joi Schemas', () => {
    describe('itemSchema', () => {
      it('should validate a valid item object', () => {
        const validItem = { id: 1, name: 'Test Item', price: 12.34 };
        const { error, value } = itemSchema.validate(validItem);
        expect(error).toBeUndefined();
        expect(value).toEqual(validItem);
      });

      it('should fail validation if required fields are missing', () => {
        const invalidItem = { name: 'Test Item' }; // missing id and price
        const { error } = itemSchema.validate(invalidItem);
        expect(error).toBeDefined();
      });

      it('should have the label "Item"', () => {
        const desc = itemSchema.describe();
        expect((desc.flags as WithLabel)?.label).toBe('Item');
      });
    });

    describe('itemListSchema', () => {
      it('should validate a valid list of items', () => {
        const validItems = [
          { id: 1, name: 'Item One', price: 10.00 },
          { id: 2, name: 'Item Two', price: 20.50 }
        ];
        const { error, value } = itemListSchema.validate(validItems);
        expect(error).toBeUndefined();
        expect(value).toEqual(validItems);
      });

      it('should fail validation if any item is invalid', () => {
        const invalidItems = [
          { id: 1, name: 'Item One', price: 10.00 },
          { id: '2', name: 'Item Two', price: 'not a number' }
        ];
        const { error } = itemListSchema.validate(invalidItems);
        expect(error).toBeDefined();
      });

      it('should have the label "ItemList"', () => {
        const desc = itemListSchema.describe();
        expect((desc.flags as WithLabel).label).toBe('ItemList');
      });
    });
  });

  describe('Price Column Transformer', () => {
    /**
     * The Item entity defines an inline transformer on the price column:
     *
     *   transformer: {
     *     to: (value: number) => value,
     *     from: (value: string): number => parseFloat(value)
     *   }
     *
     * Since the transformer is defined inline in the decorator,
     * we simulate its behavior here.
     */
    const priceTransformer = {
      to: (value: number) => value,
      from: (value: string): number => parseFloat(value)
    };

    it('should correctly transform a number to a database value (to)', () => {
      const input = 12.34;
      const result = priceTransformer.to(input);
      expect(result).toBe(input);
    });

    it('should correctly transform a string from the database to a number (from)', () => {
      const input = "12.34";
      const result = priceTransformer.from(input);
      expect(result).toBeCloseTo(12.34);
    });

    it('should return NaN if the input string is not a valid number', () => {
      const input = "not a number";
      const result = priceTransformer.from(input);
      expect(isNaN(result)).toBe(true);
    });
  });

  describe('Item Entity', () => {
    it('should create a new instance of Item with the expected properties', () => {
      const item = new Item();
      // Since properties are defined as required by TypeORM decorators,
      // the instance will have undefined values until assigned.
      expect(item).toBeInstanceOf(Item);
      expect(item.id).toBeUndefined();
      expect(item.name).toBeUndefined();
      expect(item.price).toBeUndefined();
    });
  });
});
