import HttpCode from "../utilities/http_code";
import { getUsersInGame } from "../db/db_games";

// * CHECK IF THE USER IS AUTHENTICATED
const isAuthenticated = (req, res, next) => {
  // check if the user session exists
  if (req.session.user !== undefined) {
    next();
  } else {
    // if session doesn't exist, send forbidden status with error message
    return res
      .status(HttpCode.Forbidden)
      .json({ error: "You are not allowed to access this page" });
  }
};

// * CHECK IF THE USER IS IN THE GAME
const isUserInGame = async (req, res, next) => {
  const { id: gameId } = req.params; // extract game ID from request parameters
  const { id: userId } = req.session.user; // extract user ID from session

  const users = await getUsersInGame(gameId);
  if (users.includes(Number(userId))) {
    next();
  } else {
    // if user is not found in the game, send forbidden status with error message
    return res
      .status(HttpCode.Forbidden)
      .json({ error: "You are not a player in the requested game page" });
  }
};

export { isAuthenticated, isUserInGame };
