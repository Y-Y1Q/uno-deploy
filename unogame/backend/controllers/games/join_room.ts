import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const joinGameroom = async (req, res) => {
  const { roomid, userid } = req.body;

  GamesDB.joinGameroom(roomid, userid)
    .then(() => {
      return res.status(HttpCode.OK).json({});
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { joinGameroom };
