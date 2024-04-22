import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const quitGame = async (req, res) => {
  const { id: roomId } = req.params;
  const { id: userId } = req.session.user;

  // TODO: delete room after everyone quit?

  await GamesDB.quitGame(roomId, userId)
    .then(() => {
      return res.status(HttpCode.OK).json({
        message: "userId=" + userId + " roomId=" + roomId + " LEAVE",
      });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err });
    });
};

export { quitGame };
