import HttpCode from "../../../constants/http_code";
import { SocketEvent } from "../../../constants/socket_event";
import * as GamesDB from "../../db/db_games";
import { getUser } from "../../db/users";

// DELETE COMMENT LATER
// Pre-condition: the sender is in the wait-room of a game (according to FE wireframe)
// request body: username - can fetch from /lobby/players
// send invite message to a user
const sendInvitation = async (req, res) => {
  const { id: fromRoomId } = req.params; //   params - someurl/:id  (placeholder)
  const { username: toUser } = req.body;
  const { username: fromUser } = req.session.user; // sender
  const { id: fromUserId } = req.session.user;
  const { id: toUserId } = await getUser(toUser);
  const { room_name: fromRoom, max_players: maxPlayers } =
    await GamesDB.getGameById(fromRoomId);
  const { count: playersCount } = await GamesDB.countUsersInGame(fromRoomId);

  if (playersCount == maxPlayers) {
    return res
      .status(HttpCode.BadRequest)
      .json({ error: "Can not send invite if game is full" });
  }

  // CASE: sender and receiver is not same user
  if (fromUserId !== toUserId) {
    const io = req.app.get("io");

    // send inv message to the toUser's lobby only
    const invMsg =
      `${fromUser} invite you to join` +
      `<a class="font-bold hover:underline" href="/game/${fromRoomId}/join">` +
      ` ${fromRoom}</a>`;

    io.to(toUserId).emit(SocketEvent.CHAT(0), {
      from: "ADMIN",
      timestamp: Date.now(),
      roomId: fromRoomId,
      message: invMsg,
    });
  }

  return res.sendStatus(200);
};

export { sendInvitation };
