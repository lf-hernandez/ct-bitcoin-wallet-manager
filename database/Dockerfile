FROM postgres:16

# For initial testing
# COPY ./init.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_DB=db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

EXPOSE 5432

CMD ["postgres"]