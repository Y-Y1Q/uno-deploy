import express from "express";
import { isUserInGame } from "../middleware/check_auth";
import { chatController } from "../controllers/ctrl_chat";
import * as Games from "../controllers/ctrl_games";

const router = express.Router();

router.post("/:id/chat", isUserInGame, chatController);

router.get("/get-games/:name?", Games.getGames);
router.post("/create", Games.createGame);
router.post("/:id/join", Games.joinGame);
router.post("/:id/quit", isUserInGame, Games.quitGame);
router.post("/:id/get-ready", isUserInGame, Games.getUserReady);
router.post("/:id/toggle-ready", isUserInGame, Games.toggleReady);
router.post("/:id/start", isUserInGame, Games.startGame);

export default router;
