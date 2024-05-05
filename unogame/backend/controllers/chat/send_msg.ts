import { funEmoji } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import { SOCKET_EVENT } from "../../../constants/socket_event";

const sendMessage = (req, res) => {
  let { id: roomId } = req.params; //   params - someurl/:id  (placeholder)
  const { message } = req.body;
  const { username } = req.session.user;

  const io = req.app.get("io");

  // 0 for lobby
  roomId = roomId === undefined ? 0 : roomId;

  console.log({ username, message, roomId });

  // Create funEmoji style avatar based on username
  const avatar = createAvatar(funEmoji, {
    seed: `${username}`,
    radius: 30,
    size: 32,
    backgroundColor: [
      "b6e3f4",
      "c0aede",
      "d1d4f9",
      "ffdfbf",
      "71cf62",
      "fcbc34",
    ],
  });

  const svg = avatar.toString();
  // console.log("test avatar:" + svg);

  io.emit(SOCKET_EVENT.CHAT(roomId), {
    avatar: svg,
    from: username,
    timestamp: Date.now(),
    message,
  });

  res.sendStatus(200);
};

export { sendMessage };
