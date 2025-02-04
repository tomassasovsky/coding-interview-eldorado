# entrypoint.sh
#!/bin/sh

# ensure .env file is copied over
cp .env .devcontainer/.env

npm run build
exec node dist/index.js
