import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const startGame = async (req, res) => {
  const { id: gameId } = req.params;

  if (await GamesDB.getGameStarted(gameId)) {
    return res
      .status(HttpCode.BadRequest)
      .json({ error: "The game is already started" });
  }

  // TODO check num of players, for max and min

  await GamesDB.startGame(gameId)
    .then(async () => {
      await GamesDB.deleteAllCards(gameId);
      const users = await GamesDB.getUsersInGame(gameId);
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
