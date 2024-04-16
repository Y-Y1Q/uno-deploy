import express from "express";
import { isUserInGame } from "../middleware/check_auth";
import { chatController } from "../controllers/ctrl_chat";
import * as Games from "../controllers/ctrl_games";

const router = express.Router();

router.post("/:id/chat", isUserInGame, chatController);

router.post("/create", Games.createGameroom);
router.get("/get-games/:name?", Games.getGamerooms);
router.post("/:id/join", Games.joinGameroom);
router.post("/:id/quit", isUserInGame, Games.quitGameroom);

// Todo
// router.post("/:id/start", Games.);
// router.post("/:id/draw-card", Games.);
// router.post("/:id/play-card", Games.);
// router.post("/:id/say-uno", Games.);

export default router;
