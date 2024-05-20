import { db } from "../db_connection";

const getGames = async () => {
  const ret = await db.any("SELECT * FROM games");

  return ret;
};

export async function getGameById(gameId) {
  return await db.one("SELECT * FROM games WHERE id=$1", [gameId]);
}

export async function isRoomNameTaken(roomName: string): Promise<boolean> {
  return await db
    .one("SELECT room_name FROM games WHERE room_name=$1", [roomName])
    .then(() => true)
    .catch(() => false);
}

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
  // always start with a number card
  const color = Math.floor(Math.random() * 4);
  const number = Math.floor(Math.random() * 10);

  await db.none(
    "UPDATE games SET started=TRUE,last_user=NULL,last_card_played=$2 WHERE id=$1",
    [gameId, color * 27 + number * 2 + 1]
  );
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

const getGameStarted = async (gameId) => {
  const ret = await db.one("SELECT started FROM games WHERE id=$1", [gameId]);

  return ret.started;
};

const getGameStatus = async (gameId) => {
  const ret = await db.one(
    "SELECT max_players,is_clockwise,last_user,last_card_played,penalty FROM games WHERE id=$1",
    [gameId]
  );

  // decouple from database when returning results
  return {
    max_players: ret.max_players,
    is_clockwise: ret.is_clockwise,
    last_user: ret.last_user,
    last_card_played: ret.last_card_played,
    penalty: ret.penalty,
  };
};

const setPenalty = async (gameId, penalty) => {
  await db.none("UPDATE games SET penalty=$2 WHERE id=$1", [gameId, penalty]);
};

const toggleReverse = async (gameId) => {
  await db.none("UPDATE games SET is_clockwise=NOT is_clockwise WHERE id=$1", [
    gameId,
  ]);
};

const setLastUserOnly = async (gameId, userId) => {
  await db.none("UPDATE games SET last_user=$2 WHERE id=$1", [gameId, userId]);
};

const setLastUserAndCard = async (gameId, userId, cardId) => {
  await db.none(
    "UPDATE games SET last_user=$2,last_card_played=$3 WHERE id=$1",
    [gameId, userId, cardId]
  );
};

export {
  getGames,
  getGamesByName,
  createGame,
  startGame,
  endGame,
  getGamesCanJoin,
  getGameStarted,
  getGameStatus,
  setPenalty,
  toggleReverse,
  setLastUserOnly,
  setLastUserAndCard,
};
