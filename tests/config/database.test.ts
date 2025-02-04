import { DataSource } from 'typeorm';
import { appDataSource, destroyDataSource } from '../../src/config/database';
import { Item } from '../../src/entities/item.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

describe('appDataSource configuration', () => {
  it('should be an instance of DataSource', () => {
    expect(appDataSource).toBeInstanceOf(DataSource);
  });

  it('should have correct configuration values', () => {
    const expectedPort = parseInt(process.env.DB_PORT || '5432');

    expect(appDataSource.options.type).toBe('postgres');
    const options = appDataSource.options as PostgresConnectionOptions;

    expect(options.port).toBe(expectedPort);
    expect(options.host).toBe(process.env.DB_HOST);
    expect(options.username).toBe(process.env.DB_USER);
    expect(options.password).toBe(process.env.DB_PASSWORD);
    expect(options.database).toBe(process.env.DB_NAME);

    expect(appDataSource.options.entities).toContain(Item);

    expect(appDataSource.options.synchronize).toBe(true);
    expect(appDataSource.options.logging).toBe(false);
  });
});

describe('destroyDataSource', () => {
  let originalIsInitializedDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    // Backup the original property descriptor for isInitialized.
    originalIsInitializedDescriptor = Object.getOwnPropertyDescriptor(appDataSource, 'isInitialized');
  });

  afterEach(() => {
    // Restore any mocked functions.
    jest.restoreAllMocks();

    // Restore the original isInitialized property.
    if (originalIsInitializedDescriptor) {
      Object.defineProperty(appDataSource, 'isInitialized', originalIsInitializedDescriptor);
    }
  });

  it('should call appDataSource.destroy() if the data source is initialized', async () => {
    // Override the isInitialized getter to simulate an initialized data source.
    Object.defineProperty(appDataSource, 'isInitialized', {
      get: () => true,
      configurable: true,
    });

    const destroySpy = jest.spyOn(appDataSource, 'destroy').mockResolvedValue(undefined);

    await destroyDataSource();

    expect(destroySpy).toHaveBeenCalled();
  });

  it('should not call appDataSource.destroy() if the data source is not initialized', async () => {
    // Override the isInitialized getter to simulate an uninitialized data source.
    Object.defineProperty(appDataSource, 'isInitialized', {
      get: () => false,
      configurable: true,
    });

    const destroySpy = jest.spyOn(appDataSource, 'destroy').mockResolvedValue(undefined);

    await destroyDataSource();

    expect(destroySpy).not.toHaveBeenCalled();
  });
});
