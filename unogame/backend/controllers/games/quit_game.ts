import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const quitGame = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  const gameStatus = await GamesDB.getGameStatus(gameId);
  if (gameStatus.started) {
    return res.status(HttpCode.BadRequest).json({
      error:
        "game is started, TODO: keep the user as AI? " +
        "Deleting the user from game will break a lot of parts",
    });
  }

  if (await GamesDB.isCreatorInGame(gameId, userId)) {
    return res.status(HttpCode.BadRequest).json({
      error:
        "The current user with userId=" +
        userId +
        " is the creator, can't quit!!!" +
        "TODO: just deleting the whole game? or assign a new creator (more things to do)?",
    });
  }

  await GamesDB.quitGame(gameId, userId)
    .then(() => {
      return res.status(HttpCode.OK).json({
        message: "userId=" + userId + " gameId=" + gameId + " LEAVE",
      });
    })
    .catch((err) => {
      return res.status(HttpCode.InternalServerError).json({ error: err });
    });
};

export { quitGame };
