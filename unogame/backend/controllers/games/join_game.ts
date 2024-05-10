import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";
import * as Socket from "../socket";

const joinGame = async (req, res) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  // check if user is in the game
  const users = await GamesDB.getUsersInGame(gameId);
  if (users.includes(Number(userId))) {
    return handleRedirect(gameId, res);
  }

  // user not in the game
  // check if game is full
  const gameStatus = await GamesDB.getGameStatus(gameId);
  if (users.length >= gameStatus.max_players) {
    req.flash(
      "error",
      "Gameroom with gameId=" +
        String(gameId) +
        " is full with player count of" +
        users.length
    );
    return res.redirect("/lobby");
  }

  // game not full, not full == not started
  // only game that is not full will accept new user join
  await GamesDB.joinGame(gameId, userId)
    .then(() => {
      res.redirect(`/game/${gameId}/wait`);

      setTimeout(async () => {
        await Socket.updateWaitroom(gameId, userId, req);
      }, 1000);
    })
    .catch((err) => {
      return res
        .status(HttpCode.InternalServerError)
        .json({ error: err.detail });
    });
};

// helper func, redirect based on the started status of game
async function handleRedirect(gameId: string, res: any) {
  const started = await GamesDB.getGameStarted(gameId);

  if (!started) {
    return res.redirect(`/game/${gameId}/wait`);
  }

  return res.redirect(`/game/${gameId}`);
}

export { joinGame };
