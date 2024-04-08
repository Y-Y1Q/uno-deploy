import { db } from "../db_connection";

const getAllGamerooms = async () => {
  const ret = await db.any("SELECT * FROM games");

  return ret;
};

export { getAllGamerooms };
