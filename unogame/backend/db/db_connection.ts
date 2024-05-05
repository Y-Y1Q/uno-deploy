import dotenv from "dotenv";
import pgp from "pg-promise";

if (process.env.NODE_ENV === "development") {
  dotenv.config();
}

if (process.env.DATABASE_URL === undefined) {
  process.env.DATABASE_URL = "YOU_FORGOT_TO_SETUP_YOUR_ENVIRONMENT";
}

let db;

try {
  db = pgp()(process.env.DATABASE_URL);

  console.log(
    `Connected to db with connection string [${process.env.DATABASE_URL}]`
  );
} catch (error) {
  console.log("Unable to connect to database");
}

export { db };
