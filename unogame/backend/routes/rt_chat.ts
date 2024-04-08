import express from "express";
import createHash from "create-hash";

const router = express.Router();

const chatSocketIO = (req, res) => {
  let { id: roomId } = req.params; //   params - /:id
  const { message } = req.body;
  const { username } = req.session.user;

  const io = req.app.get("io");

  // 0 for lobby
  roomId = roomId === undefined ? 0 : roomId;

  console.log({ username, message, roomId });

  io.emit(`chat:message:${roomId}`, {
    hash: createHash("sha256").update(username).digest("hex"),
    from: username,
    timestamp: Date.now(),
    message,
  });

  res.sendStatus(200);
};

router.post("/chat", chatSocketIO); // in lobby
router.post("/:id/chat", chatSocketIO); // in game,  :id as placeholder for roomId

export default router;
