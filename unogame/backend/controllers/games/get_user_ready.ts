import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const getUserReady = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  await GamesDB.getUserReady(gameId, userId)
    .then((ready) => {
      return res.status(HttpCode.OK).json({
        ready: ready,
      });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { getUserReady };
