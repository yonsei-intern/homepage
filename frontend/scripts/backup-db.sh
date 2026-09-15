#!/bin/sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
OUTPUT_FILE="$ROOT_DIR/database/current-data.sql"
TEMP_FILE="$OUTPUT_FILE.tmp"

cd "$ROOT_DIR"

cat > "$TEMP_FILE" <<'SQL'
-- Current homepage database snapshot.
-- On a fresh PostgreSQL volume, this runs after the schema and seed scripts.
-- Existing seed rows are removed first so this snapshot is restored exactly.

DO $$
DECLARE
  table_list TEXT;
BEGIN
  SELECT string_agg(format('%I.%I', schemaname, tablename), ', ')
  INTO table_list
  FROM pg_tables
  WHERE schemaname = 'public';

  IF table_list IS NOT NULL THEN
    EXECUTE 'TRUNCATE TABLE ' || table_list || ' RESTART IDENTITY CASCADE';
  END IF;
END
$$;

SQL

docker compose exec -T db pg_dump \
  --username=homepage_owner \
  --dbname=homepage \
  --schema=public \
  --data-only \
  --no-owner \
  --no-privileges >> "$TEMP_FILE"

mv "$TEMP_FILE" "$OUTPUT_FILE"
echo "Database snapshot saved to $OUTPUT_FILE"
