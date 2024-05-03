import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const startGame = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  // clean before every game without explcitly calling ending it
  // this should happen checking, now is only for test
  await GamesDB.endGame(gameId);
  await GamesDB.deleteAllCards(gameId);

  if (!(await GamesDB.isCreatorInGame(gameId, userId))) {
    return res.status(HttpCode.BadRequest).json({
      error:
        "The current user with userId=" +
        userId +
        " is not the creator of this room!",
    });
  }

  if (await GamesDB.getGameStarted(gameId)) {
    return res
      .status(HttpCode.BadRequest)
      .json({ error: "The game is already started" });
  }

  // TODO check num of players, for max and min

  await GamesDB.startGame(gameId)
    .then(async () => {
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
