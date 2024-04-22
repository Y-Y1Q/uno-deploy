import { db } from "../db_connection";

const joinGame = async (roomId, userId) => {
  await db.none("INSERT INTO game_users (game_id, user_id) VALUES ($1,$2)", [
    roomId,
    userId,
  ]);
};

const quitGame = async (roomId, userId) => {
  await db.none("DELETE FROM game_users WHERE game_id=$1 AND user_id=$2", [
    roomId,
    userId,
  ]);
};

const checkUserInGame = async (gameId, userId) => {
  const ret = await db.one(
    "SELECT EXISTS(SELECT * FROM game_users WHERE game_id=$1 AND user_id=$2)",
    [gameId, userId]
  );

  return ret.exists;
};

const getUserReady = async (gameid, userId) => {
  const ret = await db.one(
    "SELECT ready FROM game_users WHERE game_id=$1 AND user_id=$2",
    [gameid, userId]
  );

  return ret.ready;
};

const getAllUsersReady = async (gameid) => {
  const ret = await db.any(
    "SELECT user_id as id,ready FROM game_users WHERE game_id=$1",
    [gameid]
  );

  return ret;
};

const toggleReady = async (gameid, userId) => {
  const ret = await db.one(
    "UPDATE game_users SET ready=NOT ready WHERE game_id=$1 AND user_id=$2 RETURNING ready",
    [gameid, userId]
  );

  return ret.ready;
};

const getGamesJoined = async (userId) => {
  const ret = await db.manyOrNone(
    `SELECT games.id, games.room_name, games.max_players, COUNT(game_users.user_id) AS player_count
    FROM games
    LEFT JOIN game_users ON games.id = game_users.game_id
    WHERE games.id IN (SELECT game_id FROM game_users WHERE user_id = $1)
    GROUP BY games.id
    ORDER BY games.id ASC`,
    [userId]
  );
  return ret;
};

export {
  joinGame,
  quitGame,
  checkUserInGame,
  getUserReady,
  getAllUsersReady,
  toggleReady,
  getGamesJoined,
};
