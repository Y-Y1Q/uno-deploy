import express from "express";
import { chatController } from "../controllers/ctrl_chat";

const router = express.Router();

router.get("/", (req, res) => {
 
  res.render("test_lobby");
});

router.post("/chat", chatController);

export default router;
