import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const createGame = async (req, res) => {
  const { roomName, maxPlayers } = req.body;
  const { id: userId } = req.session.user;

  // check room's maxPlayer
  const playerCount = parseInt(maxPlayers);
  if (Number.isNaN(playerCount)) {
    req.flash(
      "error",
      "maxPlayer" +
        String(maxPlayers) +
        " is invalid, its value should be 2/3/4"
    );
    return res.redirect("/lobby");
  }

  // check room name
  const nameExist = await GamesDB.isRoomNameTaken(roomName);
  if (nameExist) {
    req.flash("error", `Room name ${roomName} is taken`);
    return res.redirect("/lobby");
  }

  const newGameId = await GamesDB.createGame(roomName, maxPlayers);

  try {
    await GamesDB.joinGame(newGameId, userId);
    await GamesDB.setCreatorInGame(newGameId, userId);
  } catch (err) {
    // ensure integrity of database because creator is set seperately
    await GamesDB.deleteGame(newGameId);
    return res
      .status(HttpCode.InternalServerError)
      .json({ message: err.detail });
  }

  return res.redirect(`/game/${newGameId}/wait`);
};

export { createGame };
