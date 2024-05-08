import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const joinGame = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  const users = await GamesDB.getUsersInGame(gameId);
  if (users.includes(Number(userId))) {
    return res.status(HttpCode.OK).json({
      message:
        "You already joined, TODO redirect into game??? This should not be error",
    });
  }

  const gameStatus = await GamesDB.getGameStatus(gameId);
  if (users.length >= gameStatus.player_count) {
    return res.status(HttpCode.Forbidden).json({
      error:
        "Gameroom with gameId=" +
        String(gameId) +
        " is full with player count of" +
        users.length,
    });
  }

  await GamesDB.joinGame(gameId, userId)
    .then(() => {
      return res
        .status(HttpCode.OK)
        .json({ message: "userId=" + userId + " gameId=" + gameId + " JOIN" });
    })
    .catch((err) => {
      return res
        .status(HttpCode.InternalServerError)
        .json({ error: err.detail });
    });
};

export { joinGame };
