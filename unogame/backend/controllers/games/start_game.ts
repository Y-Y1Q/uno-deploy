import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const startGame = async (req, res) => {
  const { id: gameId } = req.params;

  if (await GamesDB.getGameStarted(gameId)) {
    return res
      .status(HttpCode.BadRequest)
      .json({ error: "The game is already started" });
  }

  // TODO: check if the user is owner??? how

  const readyStates = await GamesDB.getAllUsersReady(gameId);
  if (readyStates.length <= 1) {
    return res.status(HttpCode.BadRequest).json({
      error: "Only 1 user is present",
    });
  } else if (!readyStates.every((data) => data === true)) {
    return res.status(HttpCode.BadRequest).json({
      error: "Not all users are ready",
    });
  }

  await GamesDB.startGame(gameId)
    .then(() => {
      return res
        .status(HttpCode.OK)
        .json({ message: "Game with id=" + String(gameId) + " start" });
    })
    .catch((err) => {
      GamesDB.endGame(gameId);

      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { startGame };
