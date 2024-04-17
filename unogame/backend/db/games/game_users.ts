import { db } from "../db_connection";

const joinGame = async (roomid, userid) => {
  await db.one("INSERT INTO game_users (game_id, user_id) VALUES ($1,$2)", [
    roomid,
    userid,
  ]);
};

const quitGame = async (roomid, userid) => {
  await db.one("DELETE FROM game_users WHERE game_id=$1 AND user_id=$2", [
    roomid,
    userid,
  ]);
};

const checkUserInGame = async (gameId, userId) => {
  const ret = await db.one(
    "SELECT EXISTS(SELECT * FROM game_users WHERE game_id=$1 AND user_id=$2)",
    [gameId, userId]
  );

  return ret.exists;
};

const getUserReady = async (gameid, userid) => {
  const ret = await db.one(
    "SELECT ready FROM game_users WHERE game_id=$1 AND user_id=$2",
    [gameid, userid]
  );

  return ret.ready;
};

const getAllUsersReady = async (gameid) => {
  const ret = await db.any("SELECT ready FROM game_users WHERE game_id=$1", [
    gameid,
  ]);

  return ret.map((row) => row.ready);
};

const toggleReady = async (gameid, userid) => {
  const ret = await db.one(
    "UPDATE game_users SET ready=NOT ready WHERE game_id=$1 AND user_id=$2 RETURNING ready",
    [gameid, userid]
  );

  return ret.ready;
};

export {
  joinGame,
  quitGame,
  checkUserInGame,
  getUserReady,
  getAllUsersReady,
  toggleReady,
};
