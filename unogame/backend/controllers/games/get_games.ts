import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const getGames = async (req, res) => {
  const { name } = req.params;

  await (name ? GamesDB.getGamesByName(name) : GamesDB.getGames())
    .then((data) => {
      return res.status(HttpCode.OK).json({ results: data });
    })
    .catch((err) => {
      return res
        .status(HttpCode.InternalServerError)
        .json({ error: err.detail });
    });
};

export { getGames };
