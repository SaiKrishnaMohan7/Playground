# Postgresql

- `docker run --name sai-postgres-test -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d --rm postgres:13.0`
- `docker exec -it -u postgres sai-postgres-test psql`
- CLI is via psql (command line tool that serves as an interface to interact with Postgresql server)
- admin commads in postgres db is run via `\`
  - ex: `\c <dbName>` or `\connect <dbName>` to connect to a db
  - `\l` or `\list` to list dbs on the server
  - `\?` - **list all commads that can be used** (use this)
  - `\h` - **all the sql commands that you can use**

-

```sql
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 25 ) UNIQUE NOT NULL,
  email VARCHAR ( 50 ) UNIQUE NOT NULL,
  full_name VARCHAR ( 100 ) NOT NULL,
  last_login TIMESTAMP,
  created_on TIMESTAMP NOT NULL
);

-- LEFT returns the first N chars of a string (RIGHT returns last N chars of a string)
SELECT comment_id, user_id, LEFT(comment, 20) AS preview FROM comments WHERE board_id = 39;
```

## JOINS

- `(INNER) JOIN`: Returns **records that have matching values in both tables**
- `LEFT (OUTER) JOIN`: Returns **all records from the left table, _and_ the matched records from the right table**
- `RIGHT (OUTER) JOIN`: Returns **all records from the right table, _and_ the matched records from the left table**
- `FULL (OUTER) JOIN`: Returns **all records when there is a match in either left or right table**

![JOINS](https://github.com/SaiKrishnaMohan7/Playground/blob/master/Databases/postgresql/img/joins.png)

![ORDER OF OPERATIONS](https://github.com/SaiKrishnaMohan7/Playground/blob/master/Databases/postgresql/img/sql-general-order-of-operations.png)

## Some nice sources

- [Bholt as always](https://btholt.github.io/complete-intro-to-databases/postgresql)
- [Random but worth skimming](https://www.cybertec-postgresql.com/en/uuid-serial-or-identity-columns-for-postgresql-auto-generated-primary-keys/)
- [Use psql to restore a dump](https://www.netguru.com/blog/how-to-dump-and-restore-postgresql-database)
- [SQL order of operations](https://learnsql.com/blog/sql-order-of-operations/)
