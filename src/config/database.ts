import { DataSource } from 'typeorm';
import { Item } from '../entities/item.entity';

import dotenv from 'dotenv';

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

const persistantDataSource = new DataSource({
  type: 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Item],
  synchronize: true,
  logging: false,
});

const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [Item],
  synchronize: true,
  logging: false,
});

export const appDataSource = isTest ? testDataSource : persistantDataSource;

export const destroyDataSource = async () => {
  if (appDataSource.isInitialized) {
    await appDataSource.destroy();
  }
};
