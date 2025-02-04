import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';

export const initializeSwagger = async (server: Hapi.Server) => {
  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: 'Items API Documentation',
      description: 'This is a sample Items API, created for a code challenge for El Dorado.',
    },
    definitionPrefix: 'useLabel',
    tags: [
      {
        name: 'items',
        description: 'API items interface'
      }
    ]
  };

  const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    { plugin: Inert },
    { plugin: Vision },
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ];

  await server.register(plugins);
}