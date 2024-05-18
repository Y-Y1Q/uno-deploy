import { SocketEvent } from "../../../constants/socket_event";
import * as GamesDB from "../../db/db_games";
import { winningMsg } from "../chat/send_admin_msg";
import { getAndCastGameStatus } from "../games/gameplay";

// import * as UsersDB from "../../db/db_users"

// for use in other controllers only, not in routes
export function gameListUpdate(req) {
  const io = req.app.get("io");
  io.emit(SocketEvent.LOBBY);
}

export async function gameStateUpdate(gameId, userId, req) {
  const io = req.app.get("io");

  const { room_name: currentRoom } = await GamesDB.getGameById(gameId);

  const status = await getAndCastGameStatus(gameId, userId);
  // const data = JSON.stringify(status)

  // Check if there is a winner
  for (const count of status.everyone_counts) {
    if (count.count == 0) {
      await winningMsg(gameId, count.id, req);
    }
  }

  /*
   emit game state update event to gameId
   client socket listen to this event then fetch data to update
*/
  io.emit(SocketEvent.UPDATE(gameId), {
    currentRoom,
    user_this_turn_name: status.user_this_turn_name,
    penalty: status.penalty,

    /* ======data below will be updated via FETCH ======d*/
    // playable_cards_index: status.playable_cards_index,
    // current_user_cards: status.current_user_cards,
    // opponent_info: status.opponent_info,
    // everyone_counts: status.everyone_counts,
    // max_players: status.max_players,
    // is_clockwise: status.is_clockwise,
    // last_user: status.last_user,
    // last_card_played: status.last_card_played,
    // user_has_drew_once: status.user_has_drew_once,
    // user_this_turn: status.user_this_turn,
  });
}
