import { db } from "../db_connection";

const joinGameroom = async (roomid, userid) => {
  await db.one("INSERT INTO game_users (game_id, user_id) VALUES ($1,$2)", [
    roomid,
    userid,
  ]);
};

export { joinGameroom };
