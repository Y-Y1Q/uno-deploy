import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const getUserCards = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  await GamesDB.getUserCards(gameId, userId)
    .then((cards) => {
      return res.status(HttpCode.OK).json({
        cards: cards,
      });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { getUserCards };
