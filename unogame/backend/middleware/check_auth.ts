import HttpCode from "../utilities/http_code";
import { foundUserInGame } from "../db/db_games";

// check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  // check if the user session exists
  if (req.session.user !== undefined) {
    next(); 
  } else {
    return res
      .status(HttpCode.Forbidden)
      .json({ error: "You are not allowed to access this page" });
  }
};

// check if the user is a player in the requested game
const isUserInGame = async (req, res, next) => {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  const found = await foundUserInGame(gameId, userId);

  // check if the user is found in the game
  if (found) {
    next();
  } else {
    return res
      .status(HttpCode.Forbidden)
      .json({ error: "You are not a player in the requested game page" });
  }
};

export { isAuthenticated, isUserInGame };
