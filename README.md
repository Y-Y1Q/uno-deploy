# Team C - UNO

## Documentation

[Link here](https://docs.google.com/document/d/1gA3w_3JDvAlj1km0ao1Uoi5Bk-KT_z1x1lfWOKegdnA/edit?usp=sharing)

## Build and Start

PostgresQL 16.2

Node.js 20.11.1 or above

Clone the repository to your local machine.

Navigate to the project directory `Team-C-unogame-csc667/`in your terminal

`npm install` install dependencies

`npm run dev` build & start in development mode, watching all source files for changes, then rebuild & restart

`npm run build` build the project

`npm run start` start the server

`npm run format` format code

`npm run prepare` install Husky pre-commit hooks

Port: 3333 or defined in .env

## Database Management

`npm run db` reset & update database schema ( will delete all data )

`npm run db:create your_migration_name` create a new migration file with the name you give it

`npm run db:migrate` update database schema, runs all `up` migrations from the current state

`npm run db:rollback` revert database schema, runs a single `down` migration (alternative option: `npm run db`)
