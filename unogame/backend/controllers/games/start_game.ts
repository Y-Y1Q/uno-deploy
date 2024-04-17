import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";
import { drawCards } from "./gameplay";

const startGame = async (req, res) => {
  const { id: gameId } = req.params;

  // clean before every game without explcitly calling ending it
  GamesDB.endGame(gameId);

  if (await GamesDB.getGameStarted(gameId)) {
    return res
      .status(HttpCode.BadRequest)
      .json({ error: "The game is already started" });
  }

  // TODO: check if the user is owner??? how

  const readyStates = await GamesDB.getAllUsersReady(gameId);
  if (!readyStates.every((row) => row.ready === true)) {
    return res.status(HttpCode.BadRequest).json({
      error: "Not all users are ready",
    });
  } else if (readyStates.length <= 1) {
    console.log(
      "*WARNING* Only 1 user is present, this will become error in final stage"
    );
    // return res.status(HttpCode.BadRequest).json({
    //   error: "Only 1 user is present",
    // });
  }

  await GamesDB.startGame(gameId)
    .then(async () => {
      for (const row of readyStates) {
        await drawCards(gameId, row.id, 10); // initialize draw count here
      }

      return res
        .status(HttpCode.OK)
        .json({ message: "Game with id=" + String(gameId) + " start" });
    })
    .catch((err) => {
      return res.status(HttpCode.BadRequest).json({ error: err.detail });
    });
};

export { startGame };
