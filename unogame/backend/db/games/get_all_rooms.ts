import { db } from "../db_connection";

const getGamerooms = async () => {
  const ret = await db.any("SELECT * FROM games");

  return ret;
};

export { getGamerooms };
