#!/bin/sh
echo "> Running Containers"
docker compose ps

echo "> Pulling new images"
docker compose pull

echo "> Stopping running containers"
docker compose stop

echo "> Removing stopped containers"
docker compose rm -f

echo "> Starting containers"
docker compose up -d
docker compose ps

echo "> Transforming built files to the right host"
docker exec -d chatpad-chatpad-1 sed -i "s#http://localhost:8080#$1#" /usr/share/nginx/html/index.2d3ace14.js
