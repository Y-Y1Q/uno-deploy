import express from "express";
import * as Chat from "../controllers/ctrl_chat";

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.render("test_game", { id });
});

router.post("/:id/chat", Chat.sendMessage);
router.post("/:id/inv", Chat.sendInvitation);

export default router;
