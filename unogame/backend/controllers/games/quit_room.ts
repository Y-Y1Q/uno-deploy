import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const quitGameroom = async (req, res) => {
  const {id: roomId } = req.params;
  const {id: userId } = req.session.user;

  await GamesDB.quitGameroom(roomId, userId)
    .then(() => {
      return res.status(HttpCode.OK).json({message: "userId - " + userId + " left roomId - " + roomId});
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err });
    });
};

export { quitGameroom };
