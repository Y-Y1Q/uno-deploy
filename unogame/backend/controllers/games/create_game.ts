import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const createGame = async (req, res) => {
  const { roomname } = req.body;

  GamesDB.createGame(roomname)
    .then(() => {
      return res.status(HttpCode.OK).json({ message: roomname + " created" });
    })
    .catch((err) => {
      return res
        .status(HttpCode.BadRequest)
        .json({ error: err });
    });
};

export { createGame };
