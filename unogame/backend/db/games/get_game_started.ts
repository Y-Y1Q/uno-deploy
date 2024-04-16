import { db } from "../db_connection";

const getGameStarted = async (gameid) => {
  return await db.one("SELECT started FROM games WHERE id=$1", [gameid])
    .started;
};

export { getGameStarted };
