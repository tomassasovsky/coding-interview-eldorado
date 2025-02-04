import { DataSource } from 'typeorm';
import { appDataSource, destroyDataSource } from '../../src/config/database';
import { Item } from '../../src/entities/item.entity';

describe('appDataSource configuration', () => {
  it('should be an instance of DataSource', () => {
    expect(appDataSource).toBeInstanceOf(DataSource);
  });

  it('should have the correct configuration values based on NODE_ENV', () => {
    const isTest = process.env.NODE_ENV === 'test';

    if (isTest) {
      // In test mode, the SQLite in-memory data source is used.
      expect(appDataSource.options.type).toBe('sqlite');
      // For SQLite configuration, the database should be ':memory:'.
      expect(appDataSource.options.database).toBe(':memory:');

      // The entities, synchronize, and logging options should still match.
      expect(appDataSource.options.entities).toContain(Item);
      expect(appDataSource.options.synchronize).toBe(true);
      expect(appDataSource.options.logging).toBe(false);
    } else {
      // In non-test mode, the PostgreSQL data source is used.
      expect(appDataSource.options.type).toBe('postgres');

      const expectedPort = parseInt(process.env.DB_PORT || '5432', 10);
      // Cast options as PostgresConnectionOptions for type safety.
      const options = appDataSource.options as {
        port: number;
        host: string | undefined;
        username: string | undefined;
        password: string | undefined;
        database: string | undefined;
        entities: any;
        synchronize: boolean;
        logging: boolean;
      };

      expect(options.port).toBe(expectedPort);
      expect(options.host).toBe(process.env.DB_HOST);
      expect(options.username).toBe(process.env.DB_USER);
      expect(options.password).toBe(process.env.DB_PASSWORD);
      expect(options.database).toBe(process.env.DB_NAME);
      expect(options.entities).toContain(Item);
      expect(options.synchronize).toBe(true);
      expect(options.logging).toBe(false);
    }
  });
});

describe('destroyDataSource', () => {
  let originalIsInitializedDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    // Back up the original property descriptor for isInitialized.
    originalIsInitializedDescriptor = Object.getOwnPropertyDescriptor(appDataSource, 'isInitialized');
  });

  afterEach(() => {
    // Restore all mocks.
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
