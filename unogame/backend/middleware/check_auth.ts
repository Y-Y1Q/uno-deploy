import HttpCode from "../utilities/http_code";
import { foundUserInGame } from "../db/db_games";

const isAuthenticated = (req, res, next) => {
  if (req.session.user !== undefined) {
    next();
  } else {
    return res
      .status(HttpCode.Forbidden)
      .json({ error: "You are not allowed to access this page" });
  }
};

const isUserInGame = async (req, res, next) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  const found = await foundUserInGame(gameId, userId);

  if (found) {
    next();
  } else {
    return res
      .status(HttpCode.Forbidden)
      .json({ error: "You are not a player in the requested game page" });
  }
};

export { isAuthenticated, isUserInGame };
