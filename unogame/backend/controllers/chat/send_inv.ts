import { SocketEvent } from "../../../constants/socket_event";
import { getUser } from "../../db/users";

// DELETE COMMENT LATER
// Pre-condition: the sender is in the wait-room of a game (according to FE wireframe)
// request body: username - can fetch from /lobby/players
// send invite message to a user
const sendInvitation = async (req, res) => {
  const { id: fromRoomId } = req.params; //   params - someurl/:id  (placeholder)
  const { username: toUser } = req.body; // in FE, sender should choose from a players list
  const { username: fromUser } = req.session.user; // sender
  const { id: fromUserId } = req.session.user;
  const { id: toUserId } = await getUser(toUser);

  // CASE: sender and receiver is not same user
  if (fromUserId !== toUserId) {
    const msg = `${fromUser} invite you to join ${fromRoomId}.`;

    const io = req.app.get("io");

    // send inv message to the toUser's lobby

    io.to(toUserId).emit(SocketEvent.CHAT(0), {
      from: "ADMIN",
      timestamp: Date.now(),

      // may use roomId to make a clickable link in the FE
      // POST   /game/${roomId}/join
      roomId: fromRoomId,
      message: msg,
    });
  }
  return res.sendStatus(200);
};

export { sendInvitation };
