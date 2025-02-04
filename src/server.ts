import { defineRoutes } from './routes/routes';
import { appDataSource, destroyDataSource } from './config/database';
import { validationFailAction } from './validations/validations';

import * as Hapi from '@hapi/hapi';
import { initializeSwagger } from './swagger';

const getServer = async () => {
    if (!appDataSource.isInitialized) {
        await appDataSource.initialize();
    }

    // Clear the database before running tests
    if (process.env.NODE_ENV === 'test') {
        await appDataSource.getRepository('Item').clear();
    }

    const server = Hapi.server({
        host: process.env.NODE_HOST || 'localhost',
        port: process.env.NODE_PORT || 3000,
        routes: {
            validate: {
                failAction: validationFailAction
            }
        }
    });

    server.events.on('stop', destroyDataSource);

    await initializeSwagger(server);
    defineRoutes(server);

    return server;
};

export const initializeServer = async () => {
    const server = await getServer();
    await server.initialize();
    return server;
};

export const startServer = async () => {
    const server = await getServer();
    await server.start();

    console.log(`Server running on ${server.info.uri}`);

    // Listen for shutdown signals to gracefully stop 
    // the server and database connection.
    const shutdown = async () => {
        console.log('Shutting down server...');
        await server.stop();
        destroyDataSource();
        process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

    return server;
};
