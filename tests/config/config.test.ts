describe('Config Validation', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('should validate configuration successfully when all required env vars are present', () => {
    process.env.NODE_HOST = '0.0.0.0';
    process.env.NODE_PORT = '3000';
    process.env.DB_NAME = 'mydb';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';
    process.env.DB_USER = 'postgres';
    process.env.DB_PASSWORD = 'postgres';

    expect(() => {
      // typescript will check the types of the required environment variables
      require('@/config/config');
    }).not.toThrow();
  });

  test('should throw an error when a required environment variable is missing', () => {
    process.env.NODE_HOST = '0.0.0.0';
    process.env.NODE_PORT = '3000';
    process.env.DB_NAME = undefined;
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';
    process.env.DB_USER = 'postgres';
    process.env.DB_PASSWORD = 'postgres';

    expect(() => {
      require('@/config/config');
    }).toThrow(/DB_NAME/);
  });

  test('should throw an error when an environment variable has an invalid type', () => {
    process.env.NODE_HOST = '0.0.0.0';
    process.env.NODE_PORT = 'not-a-number';  // Invalid type
    process.env.DB_NAME = 'mydb';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';
    process.env.DB_USER = 'postgres';
    process.env.DB_PASSWORD = 'postgres';

    expect(() => {
      require('@/config/config');
    }).toThrow(/NODE_PORT/);
  });
});