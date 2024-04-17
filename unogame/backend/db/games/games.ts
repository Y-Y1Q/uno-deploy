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

const startGame = async (gameid) => {
  await db.one("UPDATE games SET started=TRUE WHERE id=$1", [gameid]);
};

const getGameStarted = async (gameid) => {
  const ret = await db.one("SELECT started FROM games WHERE id=$1", [gameid]);

  return ret.started;
};

export { getGames, getGamesByName, createGame, startGame, getGameStarted };
