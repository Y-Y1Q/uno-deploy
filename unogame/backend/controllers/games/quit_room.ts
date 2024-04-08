import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const quitGameroom = async (req, res) => {
  const { roomid, userid } = req.body;

  GamesDB.quitGameroom(roomid, userid)
    .then(() => {
      return res.status(HttpCode.OK).json({});
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err });
    });
};

export { quitGameroom };
