import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import { initializeSwagger } from '../src/swagger';

describe('initializeSwagger', () => {
  it('should register Inert, Vision, and HapiSwagger with the correct options', async () => {
    // Create a mock register function.
    const registerMock = jest.fn().mockResolvedValue(undefined);

    // Create a fake server with the mocked register method.
    const server = { register: registerMock } as unknown as Hapi.Server;

    // Call the function under test.
    await initializeSwagger(server);

    // Verify that register was called exactly once.
    expect(registerMock).toHaveBeenCalledTimes(1);

    // The argument passed to register should be an array of plugins.
    const plugins = registerMock.mock.calls[0][0];
    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins).toHaveLength(3);

    // Use deep equality to compare the plugin modules.
    expect(plugins[0].plugin).toEqual(Inert);
    expect(plugins[1].plugin).toEqual(Vision);
    expect(plugins[2].plugin).toEqual(HapiSwagger);

    // Verify that the HapiSwagger plugin options are as expected.
    const options = plugins[2].options;
    expect(options).toBeDefined();
    expect(options.info).toBeDefined();
    expect(options.info.title).toBe('Items API Documentation');
    expect(options.info.description).toContain('code challenge for El Dorado');

    // Also verify other parts of the options.
    expect(options.definitionPrefix).toBe('useLabel');
    expect(Array.isArray(options.tags)).toBe(true);
    expect(options.tags).toContainEqual({
      name: 'items',
      description: 'API items interface'
    });
  });
});
