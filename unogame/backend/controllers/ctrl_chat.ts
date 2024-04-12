import createHash from "create-hash";

const chatController = (req, res) => {
  let { id: roomId } = req.params; //   params - someurl/:id  (placeholder)
  const { message } = req.body;
  const { username } = req.session.user;

  const io = req.app.get("io");

  // 0 for lobby
  roomId = roomId === undefined ? 0 : roomId;

  console.log({ username, message, roomId });

  io.emit(`chat:message:${roomId}`, {
    hash: createHash("sha256").update(username).digest("hex"), // may use this to get some random profile img from img website
    from: username,
    timestamp: Date.now(),
    message,
  });

  res.sendStatus(200);
};

export { chatController };
