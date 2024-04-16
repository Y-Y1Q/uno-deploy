import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const startGame = async (req, res) => {
  const { id: gameId } = req.params;

  if (await GamesDB.getGameStarted(gameId)) {
    return res
      .status(HttpCode.BadRequest)
      .json({ error: "The game is already started" });
  }

  // TODO: check everyone is ready before starting the game

  await GamesDB.startGame(gameId)
    .then(() => {
      return res
        .status(HttpCode.OK)
        .json({ message: "Game with id=" + String(gameId) + " start" });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { startGame };
