import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import { SocketEvent } from "../../../constants/socket_event";

const sendMessage = (req, res) => {
  let { id: roomId } = req.params;
  const { message } = req.body;
  const { username } = req.session.user;

  const io = req.app.get("io");

  // 0 for lobby
  roomId = roomId === undefined ? 0 : roomId;

  console.log({ username, message, roomId });

  // Create avataaars style avatar based on username
  const avatar = createAvatar(avataaars, {
    seed: `${username}`,
    radius: 30,
    size: 48,
    skinColor: ["614335", "edb98a"],
  });

  const svg = avatar.toString();

  io.emit(SocketEvent.CHAT(roomId), {
    avatar: svg,
    from: username,
    timestamp: Date.now(),
    message,
  });

  res.sendStatus(200);
};

export { sendMessage };
