import express from "express";
import { isUserInGame } from "../middleware/check_auth";
import * as Games from "../controllers/ctrl_games";
import * as Chat from "../controllers/ctrl_chat"


const router = express.Router();

router.post("/:id/chat", isUserInGame, Chat.sendMessage);
router.post("/:id/inv", isUserInGame, Chat.sendInvitation);

router.get("/get-games/:name?", Games.getGames);
router.post("/create", Games.createGame);
router.post("/:id/join", Games.joinGame);
router.post("/:id/quit", isUserInGame, Games.quitGame);
router.post("/:id/start", isUserInGame, Games.startGame);
router.post("/:id/get-cards", isUserInGame, Games.getUserCards);

export default router;
