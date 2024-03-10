# CoinTracker Wallet Manager

Design doc located [here](design.md)
Bitcoin/blockchain project to understand some underlying concepts [here](https://github.com/lf-hernandez/bitcoinplayground/tree/main)

## Development setup

Running via Docker Compose:

```bash
docker compose up -d
```

note*
If running app via compose there are switches for the DSN used in the backend/database initialization 
as well frontend api calls. vite config proxy will also not run in compose since it's running
a production build. This is not ideal but allowed me to quickly setting up the 3 services in compose.

Running locally:

### Backend

To setup and run containerized Postgres on Docker:

```bash
cd backend/
# build and tag image
docker build -t ct-postgres .
# create volume for data persistence 
docker volume create ct-postgres-data
# create and run docker container in background ("detached" mode)
docker run -d --name ct-database-server -v ct-postgres-data:/var/lib/postgresql/data -p 5432:5432 ct-postgres
```

To run frontend in development mode:

```bash
cd frontend/
# install deps. only do this on first run
npm i 
npm run dev
```

To run backend:

```bash
cd /backend
# assuming .venv is the name of your virtual environment. Adjust as needed
source .venv/bin/activate
pip install -r requirements
uvicorn main:app
```
