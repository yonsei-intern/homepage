#!/bin/sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$ROOT_DIR"

docker compose exec -T db psql \
  --username=homepage_owner \
  --dbname=homepage \
  --set=ON_ERROR_STOP=1 < database/current-data.sql

echo "Database snapshot restored."
