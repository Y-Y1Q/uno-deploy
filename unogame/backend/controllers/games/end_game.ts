import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const endGame = async (req, res) => {
  const { id: gameId } = req.params;

  const gameStatus = await GamesDB.getGameStatus(gameId);
  if (!gameStatus.started) {
    return res
      .status(HttpCode.BadRequest)
      .json({ error: "The game is already ended" });
  }

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
