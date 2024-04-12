import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const joinGameroom = async (req, res) => {
  const {id: roomId } = req.params;
  const {id: userId } = req.session.user;

  const found = await GamesDB.foundUserInGame(roomId, userId);
  if( found ){
    return res.status(HttpCode.BadRequest).json({ error: "You already joined" });
  }

  await GamesDB.joinGameroom(roomId, userId)
    .then(() => {
      return res.status(HttpCode.OK).json({ message: "userId - " + userId + " joined gameId - " + roomId});
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { joinGameroom };
