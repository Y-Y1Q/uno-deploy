import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const drawCards = async (gameId, userId, n) => {
  const cards: number[] = [];
  for (let i = 0; i < n; i++) {
    cards.push(Math.floor(Math.random() * 108) + 1);
  }

  return await GamesDB.drawCards(gameId, userId, cards);
};

export { drawCards };
