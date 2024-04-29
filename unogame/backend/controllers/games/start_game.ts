import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";
import { drawCards } from "./gameplay";

const startGame = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  // clean before every game without explcitly calling ending it
  // this should happen checking, now is only for test
  await GamesDB.endGame(gameId);
  await GamesDB.deleteCards(gameId);

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

  await GamesDB.startGame(gameId)
    .then(async () => {
      const users = await GamesDB.getUsersInGame(gameId);
      for (const uid of users) {
        await drawCards(gameId, uid, 10); // initialize draw count here
      }

      return res
        .status(HttpCode.OK)
        .json({ message: "Game with id=" + String(gameId) + " start" });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { startGame };
