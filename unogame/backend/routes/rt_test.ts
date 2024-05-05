import express from "express";

import * as Chat from "../controllers/ctrl_chat";
import * as Session from "../middleware/session";

const router = express.Router();

router.get("/test", (req, res) => {
  res.render("test/test_root");
});

router.get("/test/game/:id", (req, res) => {
  const { id } = req.params;

  const { username: currentUser, id: currentUserId } =
    Session.getCurrentUser(req);

  res.render("test/test_game", { id, currentUser, currentUserId });
});

router.get("/test/lobby", (req, res) => {
  const { username: currentUser, id: currentUserId } =
    Session.getCurrentUser(req);

  res.render("test/test_lobby", { currentUser, currentUserId });
});

router.get("/test/m2-chat", (req, res) => {
  const { username: currentUser, id: currentUserId } =
    Session.getCurrentUser(req);

  res.render("test/test_m2_chat", { currentUser, currentUserId });
});

router.post("/test/chat", Chat.sendMessage);
router.post("/test/:id/chat", Chat.sendMessage);
router.post("/test/:id/inv", Chat.sendInvitation);

export default router;
