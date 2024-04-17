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

const createGame = async (roomName) => {
  const ret = await db.one(
    "INSERT INTO games (room_name) VALUES ($1) RETURNING id",
    [roomName]
  );

  return ret.id;
};

const startGame = async (gameId) => {
  await db.one("UPDATE games SET started=TRUE WHERE id=$1", [gameId]);
};

const endGame = async (gameId) => {
  await db.one("UPDATE games SET started=FALSE WHERE id=$1", [gameId]);
};

const getGameStarted = async (gameId) => {
  const ret = await db.one("SELECT started FROM games WHERE id=$1", [gameId]);

  return ret.started;
};

export {
  getGames,
  getGamesByName,
  createGame,
  startGame,
  getGameStarted,
  endGame,
};
