import express from "express";

import * as Chat from "../controllers/ctrl_chat";
import * as Session from "../middleware/session";

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  // will get Type error if using req.session.user directly
  // alternative solution: Typescript Declaration Merging
  const { username: currentUser, id: currentUserId } =
    Session.getCurrentUser(req);

  res.render("test/test_game", { id, currentUser, currentUserId });
});

router.post("/:id/chat", Chat.sendMessage);
router.post("/:id/inv", Chat.sendInvitation);

export default router;
