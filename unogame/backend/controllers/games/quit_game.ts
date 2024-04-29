import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const quitGame = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  // TODO: delete room after everyone quit?

  await GamesDB.quitGame(gameId, userId)
    .then(() => {
      return res.status(HttpCode.OK).json({
        message: "userId=" + userId + " gameId=" + gameId + " LEAVE",
      });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err });
    });
};

export { quitGame };
