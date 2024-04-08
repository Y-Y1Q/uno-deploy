import { db } from "../db_connection";

const quitGameroom = async (roomid, userid) => {
  db.none("DELETE FROM game_users WHERE game_id=$1 AND user_id=$2", [
    roomid,
    userid,
  ]);
};

export { quitGameroom };
