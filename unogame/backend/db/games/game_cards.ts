import { db } from "../db_connection";

const drawCards = async (game_id, user_id, card_ids) => {
  const keys = "(" + String(game_id) + "," + String(user_id) + ",";
  let values = "";

  for (const id of card_ids) {
    values += keys + String(id) + "),";
  }

  await db.none(
    "INSERT INTO game_cards (game_id, user_id, card_id) VALUES " +
      values.substring(0, values.length - 1)
  );
};

const deleteCards = async (gameId) => {
  await db.none("DELETE FROM game_cards WHERE game_id=$1", [gameId]);
};

const getUserCards = async (gameId, userId) => {
  const ret = await db.any(
    "SELECT card_id FROM game_cards WHERE game_id=$1 AND user_id=$2",
    [gameId, userId]
  );

  return ret.map((row) => row.card_id);
};

export { drawCards, deleteCards, getUserCards };
