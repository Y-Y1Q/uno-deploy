import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const readyGame = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  await GamesDB.readyGame(gameId, userId)
    .then((ready) => {
      return res.status(HttpCode.OK).json({
        ready: ready,
        message:
          "Game with id=" +
          String(gameId) +
          " user id=" +
          String(userId) +
          ready
            ? " is ready (YES)"
            : "is NOT ready (NO)",
      });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { readyGame };
