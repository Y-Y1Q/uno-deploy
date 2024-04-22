import * as GamesDB from "../../db/db_games";
import HttpCode from "../../utilities/http_code";

// delete comment later
// get all games that a user joined

const getGamesJoined = async (req, res) => {
  const { id: userId } = req.session.user;
try{
    const gamesJoined = await GamesDB.getGamesJoined(userId);
    return res
    .status(HttpCode.OK)
    .json(gamesJoined);

}catch(err){
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
}
};

export { getGamesJoined };
