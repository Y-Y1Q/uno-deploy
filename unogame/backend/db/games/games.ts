import { db } from "../db_connection";
import { deleteCards } from "./game_cards";

const getGames = async () => {
  const ret = await db.any("SELECT * FROM games");

  return ret;
};

const getGamesByName = async (roomName) => {
  const ret = await db.any(
    "SELECT * FROM games WHERE room_name LIKE '%" + roomName + "%'"
  );

  return ret;
};

const createGame = async (roomName) => {
  const ret = await db.one(
    "INSERT INTO games (room_name) VALUES ($1) RETURNING id",
    [roomName]
  );

  return ret.id;
};

const startGame = async (gameId) => {
  await db.none("UPDATE games SET started=TRUE WHERE id=$1", [gameId]);
};

const endGame = async (gameId) => {
  await deleteCards(gameId);
  await db.none("UPDATE games SET started=FALSE WHERE id=$1", [gameId]);
};

const getGameStarted = async (gameId) => {
  const ret = await db.one("SELECT started FROM games WHERE id=$1", [gameId]);

  return ret.started;
};

const getGamesCanJoin = async (userId) => {
  const ret = await db.manyOrNone(
    `SELECT games.id, games.room_name, games.max_players, COUNT(game_users.user_id) AS player_count
    FROM games
    LEFT JOIN game_users ON games.id = game_users.game_id
    WHERE games.started = false
      AND games.id NOT IN (
        SELECT game_id
        FROM game_users
        WHERE user_id = $1)
    GROUP BY games.id
    HAVING games.max_players > COUNT(game_users.user_id)
    ORDER BY games.id ASC`,
    [userId]
  );

  return ret;
};

export {
  getGames,
  getGamesByName,
  createGame,
  startGame,
  getGameStarted,
  endGame,
  getGamesCanJoin,
};
