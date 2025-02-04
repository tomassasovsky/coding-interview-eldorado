# Coding Interview Backend Level 3

This project is a code challenge for El Dorado. It implements a REST API to perform CRUD operations on an [Item](/src/entities/item.entity.ts#L5) entity. The entity has three fields: [id](/src/entities/item.entity.ts#L7),
[name](/src/entities/item.entity.ts#L10), and [price](/src/entities/item.entity.ts#L22).

> A Spanish version of this README is available [here](README.es.md).

## Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Setup & Running the Project](#setup--running-the-project)
  - [Using VS Code Dev Containers](#using-vs-code-dev-containers)
  - [Without Containers](#without-containers)
- [API Endpoints](#api-endpoints)
- [Validations](#validations)
- [Database Configuration](#database-configuration)
- [Swagger Documentation](#swagger-documentation)
- [Testing](#testing)
- [Development Container](#development-container)

## Overview

This API allows you to list, create, retrieve, update, and delete items. It uses [TypeORM](https://typeorm.io/) with [PostgreSQL](https://www.postgresql.org/) to store data and the [Hapi](https://hapi.dev/) framework to build the web server.

## Directory Structure

- **.devcontainer/** – Contains configuration for VS Code Dev Containers.  
  See devcontainer.json and Dockerfile.

- **src/** – Application source code.  
  - **config/**: Database and application configuration ([database.ts](src/config/database.ts), [config.ts](src/config/config.ts)).  
  - **controllers/**: API handlers for items ([items.controller.ts](src/controllers/items.controller.ts)).  
  - **entities/**: Database models and response schemas ([item.entity.ts](src/entities/item.entity.ts), [response.schema.ts](src/entities/response.schema.ts)).  
  - **routes/**: API endpoint definitions ([ping.route.ts](src/routes/ping.route.ts), [items.routes.ts](src/routes/item.routes.ts), [routes.ts](src/routes/routes.ts)).  
  - **swagger.ts**: Sets up API documentation ([swagger.ts](src/swagger.ts)).  
  - **validations/**: Request validation logic ([items.validations.ts](src/validations/items.validations.ts), [validations.ts](src/validations/validations.ts)).  
  - [**server.ts**](src/server.ts) and [**index.ts**](src/index.ts): Server startup files.

- **e2e/** – End-to-end tests for API ([index.test.ts](e2e/index.test.ts)).

- **Other files**: Configuration files like [package.json](package.json), [tsconfig.json](tsconfig.json), [jest.config.js](jest.config.js), and environment samples ([.env.example](.env.example)).

## Setup & Running the Project

### Using VS Code Dev Containers

1. Open the project in Visual Studio Code.
2. Reopen the project in the container using the configuration from [devcontainer.json](.devcontainer/devcontainer.json). This will run the `postCreateCommand` (i.e. `npm install`).
3. Ensure environment variables are set in a [.env](.env) file based on the root [.env.example](.env.example). This will automatically copy over to .devcontainer/.env when the container is built, or when the entrypoint is ran.

### Without Containers

1. Install dependencies using:

   ```sh
   npm install
   ```

2. Build the project:

   ```sh
   npm run build
   ```

3. Start the server:

   ```sh
   npm start
   ```

## API Endpoints

The API exposes the following endpoints:

- **GET /ping**  
  Health check endpoint. See [ping.route.ts](src/routes/ping.route.ts).

- **GET /items**  
  Retrieves a list of items.

- **GET /items/{id}**  
  Retrieves a single item by ID.

- **POST /items**  
  Creates a new item.  
  Payload must include 
    - `name` (string)
    - `price` (non-negative number)

- **PUT /items/{id}**  
  Updates an existing item.

- **DELETE /items/{id}**  
  Deletes an item.

API routes for **items** are defined in [items.routes.ts](src/routes/items.routes.ts) and integrated in [routes.ts](src/routes/routes.ts).

## Validations

Request payloads and parameters are validated using [Joi](https://joi.dev/). Validation schemes for items are defined in [items.validations.ts](src/validations/items.validations.ts), and the global validation failure action is in [validations.ts](src/validations/validations.ts).

## Database Configuration

The API uses [PostgreSQL](https://www.postgresql.org/) for persistence. Settings are configured via environment variables and initialized in [database.ts](src/config/database.ts) using [TypeORM](https://typeorm.org/). For development, ensure a running [PostgreSQL](https://typeorm.io/) container is available (see below).

## Swagger Documentation

API documentation is automatically generated using Swagger. You can view the docs by visiting the appropriate URL on your running server, at `/documentation`. Setup for Swagger is in swagger.ts.

## Testing

End-to-end tests are provided in `index.test.ts` using [Jest](https://jestjs.io/). Run the tests with:

```sh
npm test
```

## Development Container

The project contains configuration for using VS Code's Dev Containers. Refer to the files:

- [devcontainer.json](.devcontainer/devcontainer.json)
- [docker-compose.yml](.devcontainer/docker-compose.yml)
- [Dockerfile](.devcontainer/Dockerfile)

These files configure a development environment with Node.js, PostgreSQL, and the necessary dependencies.
