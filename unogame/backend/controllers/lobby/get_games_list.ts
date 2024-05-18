import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";

const getGamesList = async (req, res) => {
  const { id: userId } = req.session.user;
  try {
    const gamesJoined = await GamesDB.getGamesJoined(userId);
    const gamesCanJoin = await GamesDB.getGamesCanJoin(userId);
    return res.status(HttpCode.OK).json({ gamesJoined, gamesCanJoin });
  } catch (err) {
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
  }
};

export { getGamesList };
