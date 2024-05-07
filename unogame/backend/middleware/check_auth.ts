import HttpCode from "../../constants/http_code";
import * as GamesDB from "../db/db_games";

// * CHECK IF THE USER IS AUTHENTICATED
const isAuthenticated = (req, res, next) => {
  // check if the user session exists
  if (req.session.user !== undefined && req.session.user.id !== undefined) {
    // if user session exists, set user info to local storage
    res.locals.user = {
      ...req.session.user,
    };

    next();
  } else {
    // if session doesn't exist, redirect to landing page

    req.flash("error", "You are not allowed to access this page");
    return res.redirect("/");
  }
};

// * CHECK IF THE USER IS IN THE GAME
// TODO: add additional check
//  if game is not started, redirect to game wait page
const isUserInGame = async (req, res, next) => {
  const { id: gameId } = req.params; // extract game ID from request parameters
  const { id: userId } = req.session.user; // extract user ID from session

  const users = await GamesDB.getUsersInGame(gameId);
  if (users.includes(Number(userId))) {
    next();
  } else {
    // if user is not found in the game, redirect to lobby
    req.flash("error", "You are not a player in the requested game");
    return res.redirect("/lobby");
  }
};
const isCreatorInGame = async (req, res, next) => {
  const { id: gameId } = req.params; // extract game ID from request parameters
  const { id: userId } = req.session.user; // extract user ID from session

  const isCreator = await GamesDB.isCreatorInGame(gameId, userId);
  if (isCreator) {
    next();
  } else {
    return res.status(HttpCode.BadRequest).json({
      error:
        "The current user with userId=" +
        userId +
        " is not the creator of this room!",
    });
  }
};

export { isAuthenticated, isUserInGame, isCreatorInGame };
