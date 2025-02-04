import { Server } from '@hapi/hapi';
import { itemRoutes } from './items.routes';
import { pingRoute } from './ping.route';

export const defineRoutes = (server: Server) => {
    server.route(pingRoute);
    server.route(itemRoutes);
};
