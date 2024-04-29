import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

const createGame = async (req, res) => {
  const { roomName } = req.body;
  const { id: userId } = req.session.user;

  await GamesDB.createGame(roomName, userId)
    .then(async (gameId) => {
      try {
        await GamesDB.joinGame(gameId, userId);
        await GamesDB.setCreatorInGame(gameId, userId);
      } catch (err) {
        // ensure integrity of database because creator is set seperately
        await GamesDB.deleteGame(gameId);
        return res.status(HttpCode.BadRequest).json({ message: err.detail });
      }

      return res
        .status(HttpCode.OK)
        .json({ message: "Created and joined with gameId=" + gameId });
    })
    .catch(async (err) => {
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
