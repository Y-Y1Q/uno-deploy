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

const userHasCard = async (gameId, userId, cardId) => {
  const ret = await db.one(
    "SELECT EXISTS(SELECT * FROM game_cards WHERE game_id=$1 AND user_id=$2 AND card_id=$3)",
    [gameId, userId, cardId]
  );

  return ret.exists;
};

export { drawCards, deleteAllCards, getUserCards, deleteOneCard, userHasCard };
