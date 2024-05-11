// TODO
// Additional chat features
// send message to all users in a lobby, when a game is created
// send message to all users in a game, when a card is played
// ...
import { SocketEvent } from "../../../constants/socket_event";

// import * as GamesDB from "../../db/db_games";

export async function waitroomStartMsg(gameId, req) {
  const io = req.app.get("io");

  io.emit(SocketEvent.CHAT(gameId), {
    from: "ADMIN",
    gameId,
    timestamp: Date.now(),
    message: "start",
  });
}
