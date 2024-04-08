import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const getGameroomsByName = async (req, res) => {
  const { roomname } = req.body;

  GamesDB.getGameroomsByName(roomname)
    .then((data) => {
      return res.status(HttpCode.OK).json({ results: data });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err });
    });
};

export { getGameroomsByName };
