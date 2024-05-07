import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const createGame = async (req, res) => {
  const { roomName, maxPlayer } = req.body;
  const { id: userId } = req.session.user;

  const playerCount = parseInt(maxPlayer);
  if (Number.isNaN(playerCount)) {
    return res.status(HttpCode.BadRequest).json({
      message:
        "maxPlayer" +
        String(maxPlayer) +
        " is invalid, its value should be 2/3/4",
    });
  }

  await GamesDB.createGame(roomName, maxPlayer)
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
