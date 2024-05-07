import { db } from "../db_connection";

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

const createGame = async (roomName, maxPlayer) => {
  const ret = await db.one(
    "INSERT INTO games (room_name, max_players) VALUES ($1,$2) RETURNING id",
    [roomName, maxPlayer]
  );

  return ret.id;
};

const startGame = async (gameId) => {
  await db.none("UPDATE games SET started=TRUE WHERE id=$1", [gameId]);
};

const endGame = async (gameId) => {
  await db.none("UPDATE games SET started=FALSE WHERE id=$1", [gameId]);
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

const getGameStatus = async (gameId) => {
  const ret = await db.one(
    "SELECT started,max_players,current_turn,current_penalty,last_card FROM games WHERE id=$1",
    [gameId]
  );

  return {
    started: ret.started,
    count: ret.max_players,
    turn: ret.current_turn,
    penalty: ret.current_penalty,
    last_card: ret.last_card,
  };
};

const setLastCard = async (gameId, cardId) => {
  await db.none("UPDATE games SET last_card=$2 WHERE id=$1", [gameId, cardId]);
};

export {
  getGames,
  getGamesByName,
  createGame,
  startGame,
  endGame,
  getGamesCanJoin,
  getGameStatus,
  setLastCard,
};
