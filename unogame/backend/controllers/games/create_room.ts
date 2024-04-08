import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const createGameroom = async (req, res) => {
  const { roomname } = req.body;

  GamesDB.createGameroom(roomname)
    .then((id) => {
      return res.status(HttpCode.OK).json({ id: id });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err });
    });
};

export { createGameroom };
