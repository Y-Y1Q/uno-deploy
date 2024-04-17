import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const joinGameroom = async (req, res) => {
  const { id: roomId } = req.params;
  const { id: userId } = req.session.user;

  const found = await GamesDB.foundUserInGame(roomId, userId);
  if (found) {
    return res.status(HttpCode.BadRequest).json({
      error: "You already joined, you should direct into game (TODO redirect?)",
    });
  }

  await GamesDB.joinGameroom(roomId, userId)
    .then(() => {
      return res
        .status(HttpCode.OK)
        .json({ message: "userId=" + userId + " gameId=" + roomId + " JOIN"});
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { joinGameroom };
