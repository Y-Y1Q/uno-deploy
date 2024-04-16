import { db } from "../db_connection";

const readyGame = async (gameid, userid) => {
  const ret = await db.one(
    "UPDATE game_users SET ready=NOT ready WHERE game_id=$1 AND user_id=$1 RETURNING ready",
    [gameid, userid]
  );

  return ret.ready;
};

export { readyGame };
