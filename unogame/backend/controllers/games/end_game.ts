import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const endGame = async (req, res) => {
  const { id: gameId } = req.params;

  await GamesDB.deleteAllCards(gameId);
  await GamesDB.endGame(gameId)
    .then(() => {
      return res
        .status(HttpCode.OK)
        .json({ message: "Game with id=" + String(gameId) + " end" });
    })
    .catch((err) => {
      return res
        .status(HttpCode.InternalServerError)
        .json({ error: err.detail });
    });
};

export { endGame };
