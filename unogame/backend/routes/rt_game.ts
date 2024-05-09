import express from "express";

import * as Chat from "../controllers/ctrl_chat";
import * as Games from "../controllers/ctrl_games";
import {
  isCreatorInGame,
  isGameEnded,
  isGameStarted,
  isUserInGame,
} from "../middleware/check_auth";

const router = express.Router();

router.post("/:id/chat", isUserInGame, Chat.sendMessage);
router.post("/:id/inv", isUserInGame, Chat.sendInvitation);

router.get("/get-games/:name?", Games.getGames);
router.post("/create", Games.createGame);
router.post("/:id/join", isGameEnded, Games.joinGame);
router.post("/:id/quit", isUserInGame, isGameEnded, Games.quitGame);
router.post(
  "/:id/start",
  isUserInGame,
  isCreatorInGame,
  isGameEnded,
  Games.startGame
);
router.post(
  "/:id/end",
  isUserInGame,
  isCreatorInGame,
  isGameStarted,
  Games.endGame
);
router.post(
  "/:id/get-status",
  isUserInGame,
  isGameStarted,
  Games.getGameCurrentStatus
);
router.post("/:id/play", isUserInGame, isGameStarted, Games.playGame);

export default router;
