import { db } from "../db_connection";

const startGame = async (gameid) => {
  await db.one("UPDATE games SET started=TRUE WHERE id=$1", [gameid]);
};

export { startGame };
