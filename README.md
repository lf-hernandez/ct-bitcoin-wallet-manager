# CoinTracker Wallet Manager

## Development setup

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
