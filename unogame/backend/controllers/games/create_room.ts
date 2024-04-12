import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const createGameroom = async (req, res) => {
  const { roomname } = req.body;

  await GamesDB.createGameroom(roomname)
    .then((id) => {
      return res.status(HttpCode.OK).json({ id: id });
    })
    .catch((err) => {
      let msg = "";
      if (err.code == 23505) {
        msg = "The name '" + roomname + "' is already taken by someone";
      } else {
        msg = err.detail;
      }
      return res.status(HttpCode.BadRequest).json({ error: msg });
    });
};

export { createGameroom };
