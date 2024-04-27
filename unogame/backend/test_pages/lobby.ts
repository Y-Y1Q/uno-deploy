import express from "express";
import * as Chat from "../controllers/ctrl_chat";
import * as Session from "../middleware/session";

const router = express.Router();



router.get("/", (req, res) => {

  // will get Type error if using req.session.user directly
  // alternative solution: Typescript Declaration Merging
  const {username: currentUser, id: currentUserId } = Session.getCurrentUser(req);
  
  res.render("test_lobby", { currentUser, currentUserId } );
});

router.get("/m2-chat", (req, res) => {

  // will get Type error if using req.session.user directly
  // alternative solution: Typescript Declaration Merging
  const {username: currentUser, id: currentUserId } = Session.getCurrentUser(req);
  
  res.render("test_m2_chat", { currentUser, currentUserId } );
});

router.post("/chat", Chat.sendMessage);

export default router;
