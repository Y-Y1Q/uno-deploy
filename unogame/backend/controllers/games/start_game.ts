import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const startGame = async (req, res) => {
  const { id: gameId } = req.params;

  const gameStatus = await GamesDB.getGameStatus(gameId);
  if (gameStatus.started) {
    return res
      .status(HttpCode.BadRequest)
      .json({ error: "The game is already started" });
  }

  const users = await GamesDB.getUsersInGame(gameId);
  if (users.length != gameStatus.count) {
    return res.status(HttpCode.Forbidden).json({
      message: "Not enough players: " + users.length + " / " + gameStatus.count,
    });
  }

  await GamesDB.startGame(gameId)
    .then(async () => {
      await GamesDB.deleteAllCards(gameId);
      for (const uid of users) {
        await GamesDB.drawCards(gameId, uid, 10); // initialize draw count here
      }
      await GamesDB.setLastCard(gameId, Math.floor(Math.random() * 108) + 1);

      return res
        .status(HttpCode.OK)
        .json({ message: "Game with id=" + String(gameId) + " start" });
    })
    .catch((err) => {
      return res
        .status(HttpCode.InternalServerError)
        .json({ error: err.detail });
    });
};

export { startGame };
