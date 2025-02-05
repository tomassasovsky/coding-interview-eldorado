import { Server } from '@hapi/hapi';
import { defineRoutes } from '@/routes/routes';
import { itemRoutes } from '@/routes/items.routes';
import { pingRoute } from '@/routes/ping.route';

describe('defineRoutes', () => {
  it('should register pingRoute and itemRoutes on the server', () => {
    // Create a fake server with a spy for the route method.
    const routeSpy = jest.fn();
    const server = {
      route: routeSpy,
    } as unknown as Server;

    // Call the function under test.
    defineRoutes(server);

    // Assert that the route method was called twice with the correct arguments.
    expect(routeSpy).toHaveBeenCalledTimes(2);
    expect(routeSpy).toHaveBeenNthCalledWith(1, pingRoute);
    expect(routeSpy).toHaveBeenNthCalledWith(2, itemRoutes);
  });
});
