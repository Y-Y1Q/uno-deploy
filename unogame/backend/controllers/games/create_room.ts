import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const createGameroom = async (req, res) => {
  const { roomname } = req.body;

  GamesDB.createGameroom(roomname)
    .then((id) => {
      return res.status(HttpCode.OK).json({ id: id });
    })
    .catch((err) => {
      let msg = "";
      if (err.code == 23505) {
        msg = "This name is already taken!!!";
      } else {
        msg = err.detail;
      }
      return res.status(HttpCode.BadRequest).json({ message: msg });
    });
};

export { createGameroom };
