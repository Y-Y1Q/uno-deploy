import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const joinGame = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  const users = await GamesDB.getUsersInGame(gameId);
  if (users.includes(Number(userId))) {
    return res.status(HttpCode.BadRequest).json({
      error:
        "You already joined, TODO redirect into game??? This should not be error",
    });
  }

  if (await GamesDB.getGameStarted(gameId)) {
    return res
      .status(HttpCode.BadRequest)
      .json({ error: "The game is already started" });
  }

  await GamesDB.joinGame(gameId, userId)
    .then(() => {
      return res
        .status(HttpCode.OK)
        .json({ message: "userId=" + userId + " gameId=" + gameId + " JOIN" });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { joinGame };
