import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const getGamerooms = async (req, res) => {
  const { name: roomName } = req.params;

  await (
    roomName ? GamesDB.getGameroomsByName(roomName) : GamesDB.getGamerooms()
  )
    .then((data) => {
      return res.status(HttpCode.OK).json({ results: data });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { getGamerooms };
