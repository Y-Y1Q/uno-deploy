import express from "express";

import * as Chat from "../controllers/ctrl_chat";
import { isAuthenticated } from "../middleware/check_auth";
import * as Session from "../middleware/session";

const router = express.Router();

router.get("/test/game/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;

  const { username: currentUser, id: currentUserId } =
    Session.getCurrentUser(req);

  res.render("test/test_game", { id, currentUser, currentUserId });
});

router.get("/test", isAuthenticated, (req, res) => {
  const { username: currentUser, id: currentUserId } =
    Session.getCurrentUser(req);

  res.render("test/test_lobby", { currentUser, currentUserId });
});

router.get("/test/m2-chat", isAuthenticated, (req, res) => {
  const { username: currentUser, id: currentUserId } =
    Session.getCurrentUser(req);

  res.render("test/test_m2_chat", { currentUser, currentUserId });
});

router.post("/test/chat", isAuthenticated, Chat.sendMessage);
router.post("/test/:id/chat", isAuthenticated, Chat.sendMessage);
router.post("/test/:id/inv", isAuthenticated, Chat.sendInvitation);

export default router;
