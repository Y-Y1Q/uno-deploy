import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const startGame = async (req, res) => {
  const { id: gameId } = req.params;

  const gameStatus = await GamesDB.getGameStatus(gameId);
  const users = await GamesDB.getUsersInGame(gameId);
  if (users.length != gameStatus.max_players) {
    return res.status(HttpCode.Forbidden).json({
      message:
        "Not enough players: " + users.length + " / " + gameStatus.max_players,
    });
  }

  await GamesDB.startGame(gameId)
    .then(async () => {
      await GamesDB.deleteAllCards(gameId);
      for (const uid of users) {
        await GamesDB.drawCards(gameId, uid, 7); // initialize draw count here
      }

      // always start with a number card
      const color = Math.floor(Math.random() * 4);
      const number = Math.floor(Math.random() * 10);
      await GamesDB.setLastUserAndCard(
        gameId,
        null,
        color * 27 + number * 2 + 1
      );

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
