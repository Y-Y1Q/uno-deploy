import { db } from "../db_connection";

const drawCards = async (gameId, userId, count) => {
  const keys = "(" + String(gameId) + "," + String(userId) + ",";
  let values = "";

  for (let i = 0; i < count; i++) {
    let card_id = Math.floor(Math.random() * 108) + 1;
    values += keys + String(card_id) + "),";
  }

  await db.none(
    "INSERT INTO game_cards (game_id, user_id, card_id) VALUES " +
      values.substring(0, values.length - 1)
  );
};

const deleteAllCards = async (gameId) => {
  await db.none("DELETE FROM game_cards WHERE game_id=$1", [gameId]);
};

const getUserCards = async (gameId, userId) => {
  const ret = await db.any(
    "SELECT card_id FROM game_cards WHERE game_id=$1 AND user_id=$2",
    [gameId, userId]
  );

  return ret.map((row) => row.card_id);
};

const deleteOneCard = async (gameId, userId, cardId) => {
  await db.none(
    "DELETE FROM game_cards WHERE id IN" +
      "(SELECT id FROM game_cards WHERE game_id=$1 AND user_id=$2 AND card_id=$3 LIMIT 1)",
    [gameId, userId, cardId]
  );
};

const getAllUserCardCounts = async (gameId) => {
  const ret = await db.many(
    "SELECT user_id,COUNT(*) as count FROM game_cards WHERE game_id=$1 GROUP BY user_id",
    [gameId]
  );

  const counts = {};
  for (const row of ret) {
    counts[row.user_id] = Number(row.count);
  }
  return counts;
};

const getCardImgPath = async (cardId) => {
  const ret = await db.one("SELECT name FROM cards WHERE id=$1", [cardId]);

  return ret;
};

const getOpponentInfo = async (gameId, userId) => {
  const ret = await db.any(
    `SELECT gc.user_id, u.username, COUNT(gc.card_id) AS card_count 
    FROM game_cards gc
    LEFT JOIN users u on gc.user_id = u.id
    WHERE gc.game_id=$1 AND gc.user_id!=$2
    GROUP BY gc.user_id, u.username;`,
    [gameId, userId]
  );

  return ret;
};

const getDiscardPileInfo = async (gameId) => {
  const ret = await db.any(
    `SELECT g.last_card_played, c.name 
    FROM games g
    LEFT JOIN cards c on c.id = g.last_card_played
    WHERE g.id=$1`,
    [gameId]
  );

  return ret;
};

const testCards = async (gameId, userId, cardId) => {
  await db.none(
    "INSERT INTO game_cards (game_id, user_id, card_id) VALUES($1,$2,$3) ",
    [gameId, userId, cardId]
  );
};

export {
  drawCards,
  deleteAllCards,
  getUserCards,
  deleteOneCard,
  getAllUserCardCounts,
  getOpponentInfo,
  getDiscardPileInfo,
  getCardImgPath,
  testCards,
};
