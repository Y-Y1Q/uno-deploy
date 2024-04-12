import express from "express";
import { chatController } from "../controllers/ctrl_chat";

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.render("test_game", {id} );
});

router.post("/:id/chat", chatController);

export default router;
