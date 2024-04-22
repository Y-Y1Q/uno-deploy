import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const joinGame = async (req, res) => {
  const { id: roomId } = req.params;
  const { id: userId } = req.session.user;

  if (await GamesDB.checkUserInGame(roomId, userId)) {
    return res.status(HttpCode.BadRequest).json({
      error:
        "You already joined, TODO redirect into game??? This should not be error",
    });
  }

  await GamesDB.joinGame(roomId, userId)
    .then(() => {
      return res
        .status(HttpCode.OK)
        .json({ message: "userId=" + userId + " gameId=" + roomId + " JOIN" });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { joinGame };
