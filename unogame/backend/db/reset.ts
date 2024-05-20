import { db } from "./db_connection";

async function resetSchema() {
  await db.query(`
        DROP SCHEMA public CASCADE;
        CREATE SCHEMA public;
        GRANT ALL ON SCHEMA public TO postgres, public;
        COMMENT ON SCHEMA public IS 'standard public schema';
    `);
}

await resetSchema()
  .then(() => {
    console.log("Resetting DB Schema...");
  })
  .catch((err) => {
    console.error("Error resetting DB schema: ", err);
  });
