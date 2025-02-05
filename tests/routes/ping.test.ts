import { pingRoute } from '@/routes/ping.route';
import { okResponseSchema } from '@/entities/response.schema';
import { ReqRefDefaults, RouteOptions } from '@hapi/hapi';

describe('pingRoute', () => {
  it('should be a GET route with path "/ping"', () => {
    expect(pingRoute.method).toBe('GET');
    expect(pingRoute.path).toBe('/ping');
  });

  it('should have the correct route options', () => {
    const options = pingRoute.options as RouteOptions<ReqRefDefaults>;
    expect(options).toBeDefined();
    expect(options.description).toBe('Health check endpoint');
    expect(options.notes).toBe('Returns a simple JSON response to indicate the server is running');
    expect(options.tags).toContain('api');
    expect(options.response?.schema).toBe(okResponseSchema);
  });
});
