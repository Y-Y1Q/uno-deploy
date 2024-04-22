import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

// delete comment later
// get all games that a user can join
// condition: not started, not full, the user is not in the game

const getGamesCanJoin = async (req, res) => {
  const { id: userId } = req.session.user;
  try {
    const gamesCanJoin = await GamesDB.getGamesCanJoin(userId);
    return res.status(HttpCode.OK).json(gamesCanJoin);
  } catch (err) {
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
  }
};

export { getGamesCanJoin };
