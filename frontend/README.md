## Local Run

```bash
npm install
npm run dev
```

## Docker Run (Dev Server)

```bash
docker compose up --build
```

Open `http://localhost:5173`.

The database admin is a separate, local-only service:

```text
http://localhost:3001
```

It is intentionally not linked from the public homepage. It currently binds
to `0.0.0.0:3001`, like the public web service, so it can be reached through
the host machine's IP address.

Admin host access can be controlled through `.env`. `ADMIN_ALLOWED_HOSTS`
contains the accepted hostnames/IP addresses and `ADMIN_BIND_ADDRESS` controls
the bind interface. The current values allow all hosts. Because this admin has
no login, use a firewall or private VPN before exposing it to the internet.

To stop:

```bash
docker compose down
```

## Move the current database to another machine

Before copying this project, export the live PostgreSQL data:

```bash
./scripts/backup-db.sh
```

This writes the exact current rows and IDs to `database/current-data.sql`.
Copy the entire project directory, including `.env`, `database/`, and
`public/images/`, to the new machine. On a machine where this Compose project
has never been started, the following command creates the schema and restores
the snapshot automatically:

```bash
docker compose up -d --build
```

PostgreSQL initialization files only run when the database volume is empty. If
the destination already has a database volume, either run
`./scripts/restore-db.sh` or remove that destination volume first with
`docker compose down -v` (destructive).
