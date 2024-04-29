import { db } from "../db_connection";

const joinGame = async (gameId, userId) => {
  await db.none("INSERT INTO game_users (game_id, user_id) VALUES ($1,$2)", [
    gameId,
    userId,
  ]);
};

const quitGame = async (gameId, userId) => {
  await db.none("DELETE FROM game_users WHERE game_id=$1 AND user_id=$2", [
    gameId,
    userId,
  ]);
};

const deleteGame = async (gameId) => {
  await db.none("DELETE FROM games WHERE id=$1", [gameId]);
};

const setCreatorInGame = async (gameId, userId) => {
  await db.none(
    "UPDATE game_users SET is_creator=TRUE WHERE game_id=$1 AND user_id=$2",
    [gameId, userId]
  );
};

const isCreatorInGame = async (gameId, userId) => {
  const ret = await db.one(
    "SELECT is_creator FROM game_users WHERE game_id=$1 AND user_id=$2",
    [gameId, userId]
  );

  return ret.is_creator;
};

const getUsersInGame = async (gameid) => {
  const ret = await db.any("SELECT user_id FROM game_users WHERE game_id=$1", [
    gameid,
  ]);

  return ret.map((row) => row.user_id);
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
  getUsersInGame,
  getGamesJoined,
  setCreatorInGame,
  deleteGame,
  isCreatorInGame,
};
