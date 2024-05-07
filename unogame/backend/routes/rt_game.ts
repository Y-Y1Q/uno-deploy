import express from "express";

import * as Chat from "../controllers/ctrl_chat";
import * as Games from "../controllers/ctrl_games";
import { isCreatorInGame, isUserInGame } from "../middleware/check_auth";

const router = express.Router();

router.post("/:id/chat", isUserInGame, Chat.sendMessage);
router.post("/:id/inv", isUserInGame, Chat.sendInvitation);

router.get("/get-games/:name?", Games.getGames);
router.post("/create", Games.createGame);
router.post("/:id/join", Games.joinGame);
router.post("/:id/quit", isUserInGame, Games.quitGame);
router.post("/:id/start", isCreatorInGame, Games.startGame);
router.post("/:id/end", isCreatorInGame, Games.endGame);
router.post("/:id/get-cards", isUserInGame, Games.getUserCards);
router.post("/:id/get-status", isUserInGame, Games.getGameCurrentStatus);
router.post("/:id/play", isUserInGame, Games.playGame);

export default router;
