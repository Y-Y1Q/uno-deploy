import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const getAllGamerooms = async (req, res) => {
  GamesDB.getAllGamerooms()
    .then((data) => {
      return res.status(HttpCode.OK).json({ results: data });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err });
    });
};

export { getAllGamerooms };
