# Documentation

TODO

# Build and Start

[**Install PostgreSQL**](https://docs.google.com/document/d/1pbvpEM3iX-QS22NNep6ATKgohM8zu4Pu18dmw13JgrY/edit#heading=h.g7uvmg38lm4t)

Clone the repository to your local machine.
Navigate to the project directory `Team-C-unogame-csc667\`in your terminal

`npm install` install dependencies

`npm run build` build the project

`npm run dev` build the project in development mode, watching all source files for changes and rebuilding

`npm run start` start the server in development mode, watching server file for changes and restarting

`npm run format` format code

`npm run prepare` install Husky pre-commit hooks

Port: 3333 or defined locally

# Database Management

`npm run db:create your_migration_name` create a new migration file with the name you give it

`npm run db:migrate` update database schema

`npm run db:rollback` revert database schema (alternative option below)

To change tables in database (will delete all values stored):

- modify the table migration file directly
- open pgAdmin: right click the 667uno database, and select Query Tool
- run the following command to delete all old tables, then `npm run db:migrate` to add updated tables

```
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres, public;
COMMENT ON SCHEMA public IS 'standard public schema';
```
