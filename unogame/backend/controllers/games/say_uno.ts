import HttpCode from "../../../constants/http_code";
import * as GamesDB from "../../db/db_games";
import { unoMsg } from "../chat/send_admin_msg";
import { gameStateUpdate } from "../socket/game_state";

export async function sayUno(req, res) {
  const { id: gameId } = req.params;
  const { id: userId } = req.session.user;

  try {
    const cardLeft = await GamesDB.getUserCards(gameId, userId);

    if (cardLeft.length > 1) {
      return res
        .status(HttpCode.BadRequest)
        .json({ error: "You have more than 1 card!" });
    }

    await GamesDB.declareUno(gameId, userId);
    await unoMsg(gameId, userId, "declared UNO!", req);
    await gameStateUpdate(gameId, userId, req);
    return res.status(HttpCode.OK);
  } catch (err) {
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
  }
}
