import express from "express";
import * as Chat from "../controllers/ctrl_chat";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("test_lobby");
});

router.post("/chat", Chat.sendMessage);

export default router;
