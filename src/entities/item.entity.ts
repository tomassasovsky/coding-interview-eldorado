import Joi from 'joi';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'item' })
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    // if the value is a string, convert it to a number
    transformer: {
      to: (value: number) => value,
      from: (value: string): number => parseFloat(value)
    }
  })
  price!: number;
}

export const itemSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  price: Joi.number().required()
}).label('Item');

export const itemListSchema = Joi.array().items(itemSchema).label('ItemList');
