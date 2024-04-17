import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const createGame = async (req, res) => {
  const { roomName } = req.body;

  await GamesDB.createGame(roomName)
    .then((id) => {
      return res.status(HttpCode.OK).json({ id: id });
    })
    .catch((err) => {
      let msg = "";
      if (err.code == 23505) {
        msg = "The name '" + roomName + "' is already taken by someone";
      } else {
        msg = err.detail;
      }
      return res.status(HttpCode.BadRequest).json({ error: msg });
    });
};

export { createGame };
