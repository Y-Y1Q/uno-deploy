import express from "express";
import { isUserInGame } from "../middleware/check_auth";
import { chatController } from "../controllers/ctrl_chat";
import * as Games from "../controllers/ctrl_games";

const router = express.Router();

router.post("/:id/chat", isUserInGame, chatController);

router.get("/get-games/:name?", Games.getGamerooms);
router.post("/create", Games.createGameroom);
router.post("/:id/join", Games.joinGameroom);
router.post("/:id/quit", isUserInGame, Games.quitGameroom);
router.post("/:id/ready", isUserInGame, Games.readyGame);
router.post("/:id/start", isUserInGame, Games.startGame);

// Todo
// router.post("/:id/draw-card", Games.);
// router.post("/:id/play-card", Games.);
// router.post("/:id/say-uno", Games.);

export default router;
