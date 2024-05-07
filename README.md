# Team C - UNO

## Documentation

[**Frontend** ](https://docs.google.com/document/d/1Q7dy5t1PLPO-GSkX-l9Odzt26guablaQ6HB8vQvXcro/edit#heading=h.354dsx7n9cz3)

[**Backend**](https://docs.google.com/document/d/1pxNN8a4l0q5tSuLNxI1-U5J-zbsd-e8ZlxAAiAJqDFo/edit?usp=sharing)

TODO

## Build and Start

[**Install PostgreSQL**](https://docs.google.com/document/d/1pbvpEM3iX-QS22NNep6ATKgohM8zu4Pu18dmw13JgrY/edit#heading=h.g7uvmg38lm4t)

Clone the repository to your local machine.

Navigate to the project directory `Team-C-unogame-csc667/`in your terminal

`npm install` install dependencies

`npm run dev` build & start in development mode, watching all source files for changes, then rebuild & restart

`npm run start` start the server

`npm run build` build the project

`npm run format` format code

`npm run prepare` install Husky pre-commit hooks

Port: 3333 or defined in .env

## Database Management

`npm run db` reset & update database schema ( will delete all data )

`npm run db:create your_migration_name` create a new migration file with the name you give it

`npm run db:migrate` update database schema, runs all `up` migrations from the current state

`npm run db:rollback` revert database schema, runs a single `down` migration (alternative option: `npm run db`)

~~To change tables in database (will delete all data):~~
~~- modify the table migration file directly~~
~~- open pgAdmin: right click the 667uno database, and select Query Tool~~
~~- run the following command to delete all old tables, then `npm run db:migrate` to add updated tables~~

```
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres, public;
COMMENT ON SCHEMA public IS 'standard public schema';
```
