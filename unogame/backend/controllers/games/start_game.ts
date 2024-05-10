import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const startGame = async (req, res) => {
  const { id: gameId } = req.params;

  const gameStatus = await GamesDB.getGameStatus(gameId);
  const users = await GamesDB.getUsersInGame(gameId);
  if (users.length != gameStatus.max_players) {
    req.flash(
      "error",
      "Not enough players: " + users.length + " / " + gameStatus.max_players
    );
    return res.redirect(`/game/${gameId}/wait`);
  }

  await GamesDB.startGame(gameId)
    .then(async () => {
      await GamesDB.deleteAllCards(gameId);
      for (const uid of users) {
        await GamesDB.drawCards(gameId, uid, 7); // initialize draw count here
      }

      return res.redirect(`/game/${gameId}`);
    })
    .catch((err) => {
      return res
        .status(HttpCode.InternalServerError)
        .json({ error: err.detail });
    });
};

export { startGame };
