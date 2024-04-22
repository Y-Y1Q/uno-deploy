import express from "express";
import { chatController } from "../controllers/ctrl_chat";
import { sendInvitation } from "../controllers/ctrl_lobby";

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.render("test_game", { id });
});

router.post("/:id/chat", chatController);
router.post("/:id/inv", sendInvitation );

export default router;
