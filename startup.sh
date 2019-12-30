#!/bin/sh
set -e
envsubst < /usr/share/nginx/html/config.json > temp.json
cat temp.json > /usr/share/nginx/html/config.json
exec "$@"
