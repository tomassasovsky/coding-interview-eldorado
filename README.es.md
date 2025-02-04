# Entrevista de Programación Backend Nivel 3

Este proyecto es un desafío de código para El Dorado. Implementa una API REST para realizar operaciones CRUD sobre una entidad [Item](/src/entities/item.entity.ts#L5). La entidad tiene tres campos: [id](/src/entities/item.entity.ts#L7), [name](/src/entities/item.entity.ts#L10) y [price](/src/entities/item.entity.ts#L22).

> Existe una versión en inglés de este documento. Puedes encontrarla [aquí](README.md).

## Tabla de Contenidos

- [Resumen](#resumen)
- [Estructura del Directorio](#estructura-del-directorio)
- [Configuración y Ejecución del Proyecto](#configuración-y-ejecución-del-proyecto)
  - [Usando VS Code Dev Containers](#usando-vs-code-dev-containers)
  - [Sin Contenedores](#sin-contenedores)
- [Endpoints de la API](#endpoints-de-la-api)
- [Validaciones](#validaciones)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Documentación con Swagger](#documentación-con-swagger)
- [Pruebas](#pruebas)
- [Contenedor de Desarrollo](#contenedor-de-desarrollo)

## Resumen

Esta API permite listar, crear, recuperar, actualizar y eliminar elementos. Utiliza [TypeORM](https://typeorm.io/) con [PostgreSQL](https://www.postgresql.org/) para almacenar los datos y el framework [Hapi](https://hapi.dev/) para construir el servidor web.

## Estructura del Directorio

- **.devcontainer/** – Contiene configuraciones para los Dev Containers de VS Code.  
  Ver **devcontainer.json** y **Dockerfile**.

- **src/** – Código fuente de la aplicación.  
  - **config/**: Configuración de la base de datos y la aplicación ([database.ts](src/config/database.ts), [config.ts](src/config/config.ts)).  
  - **controllers/**: Manejadores de API para los elementos ([items.controller.ts](src/controllers/items.controller.ts)).  
  - **entities/**: Modelos de base de datos y esquemas de respuesta ([item.entity.ts](src/entities/item.entity.ts), [response.schema.ts](src/entities/response.schema.ts)).  
  - **routes/**: Definiciones de endpoints de la API ([ping.route.ts](src/routes/ping.route.ts), [items.routes.ts](src/routes/item.routes.ts), [routes.ts](src/routes/routes.ts)).  
  - **swagger.ts**: Configura la documentación de la API ([swagger.ts](src/swagger.ts)).  
  - **validations/**: Lógica de validación de solicitudes ([items.validations.ts](src/validations/items.validations.ts), [validations.ts](src/validations/validations.ts)).  
  - [**server.ts**](src/server.ts) y [**index.ts**](src/index.ts): Archivos de inicio del servidor.

- **e2e/** – Pruebas de extremo a extremo de la API ([index.test.ts](e2e/index.test.ts)).

- **Otros archivos**: Archivos de configuración como [package.json](package.json), [tsconfig.json](tsconfig.json), [jest.config.js](jest.config.js) y ejemplos de variables de entorno ([.env.example](.env.example)).

## Configuración y Ejecución del Proyecto

### Usando VS Code Dev Containers

1. Abre el proyecto en Visual Studio Code.
2. Reabre el proyecto en el contenedor usando la configuración de [devcontainer.json](.devcontainer/devcontainer.json). Esto ejecutará el `postCreateCommand` (es decir, `npm install`).
3. Asegúrate de que las variables de entorno estén configuradas en un archivo [.env](.env) basado en el [.env.example](.env.example). Esto se copiará automáticamente en .devcontainer/.env cuando se construya el contenedor o cuando se ejecute el entrypoint.

### Sin Contenedores

1. Instala las dependencias usando:

   ```sh
   npm install
   ```

2. Compila el proyecto:

   ```sh
   npm run build
   ```

3. Inicia el servidor:

   ```sh
   npm start
   ```

## Endpoints de la API

La API expone los siguientes endpoints:

- **GET /ping**  
  Endpoint de comprobación de estado. Ver [ping.route.ts](src/routes/ping.route.ts).

- **GET /items**  
  Recupera una lista de elementos.

- **GET /items/{id}**  
  Recupera un elemento por ID.

- **POST /items**  
  Crea un nuevo elemento.  
  El cuerpo debe incluir:
  - `name` (cadena de texto)
  - `price` (número no negativo)

- **PUT /items/{id}**  
  Actualiza un elemento existente.

- **DELETE /items/{id}**  
  Elimina un elemento.

Las rutas de la API para **items** están definidas en [items.routes.ts](src/routes/items.routes.ts) e integradas en [routes.ts](src/routes/routes.ts).

## Validaciones

Las cargas y parámetros de solicitud se validan usando [Joi](https://joi.dev/). Los esquemas de validación para los elementos están definidos en [items.validations.ts](src/validations/items.validations.ts), y la acción global de fallos de validación está en [validations.ts](src/validations/validations.ts).

## Configuración de la Base de Datos

La API utiliza [PostgreSQL](https://www.postgresql.org/) para persistencia. La configuración se define mediante variables de entorno e inicializa en [database.ts](src/config/database.ts) usando [TypeORM](https://typeorm.org/). Para el desarrollo, asegúrate de tener un contenedor de [PostgreSQL](https://typeorm.io/) en ejecución (ver abajo).

## Documentación con Swagger

La documentación de la API se genera automáticamente con Swagger. Puedes ver la documentación visitando la URL correspondiente en tu servidor en ejecución, en el path `/documentation`. La configuración de Swagger está en **swagger.ts**.

## Pruebas

Las pruebas de extremo a extremo están definidas en `index.test.ts` usando [Jest](https://jestjs.io/). Ejecuta las pruebas con:

```sh
npm test
```

## Contenedor de Desarrollo

El proyecto incluye configuraciones para usar los Dev Containers de VS Code. Consulta los archivos:

- [devcontainer.json](.devcontainer/devcontainer.json)
- [docker-compose.yml](.devcontainer/docker-compose.yml)
- [Dockerfile](.devcontainer/Dockerfile)

Estos archivos configuran un entorno de desarrollo con Node.js, PostgreSQL y las dependencias necesarias.