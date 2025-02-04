import { ServerRoute } from '@hapi/hapi';
import { OkResponse, okResponseSchema } from '../entities/response.schema';

export const pingRoute: ServerRoute =
{
  method: 'GET',
  path: '/ping',
  options: {
    handler: async (_, __) => {
      const response: OkResponse = { ok: true };
      return response;
    },
    response: { schema: okResponseSchema },
    description: 'Health check endpoint',
    notes: 'Returns a simple JSON response to indicate the server is running',
    tags: ['api']
  }
}