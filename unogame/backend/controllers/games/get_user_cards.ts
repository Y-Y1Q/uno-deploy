import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const getUserCards = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  const gameStatus = await GamesDB.getGameStatus(gameId);
  if (!gameStatus.started) {
    return res
      .status(HttpCode.BadRequest)
      .json({ error: "The game is not started" });
  }

  await GamesDB.getUserCards(gameId, userId)
    .then((cards) => {
      return res.status(HttpCode.OK).json({
        cards: cards,
      });
    })
    .catch((err) => {
      return res
        .status(HttpCode.InternalServerError)
        .json({ error: err.detail });
    });
};

export { getUserCards };
