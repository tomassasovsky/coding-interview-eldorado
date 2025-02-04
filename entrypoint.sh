# entrypoint.sh
#!/bin/sh

npm run build
exec node dist/index.js
