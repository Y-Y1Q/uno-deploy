import express from "express";
import * as Lobby from "../controllers/ctrl_lobby";
import * as Chat from "../controllers/ctrl_chat";

const router = express.Router();

router.post("/chat", Chat.sendMessage);

router.post("/games-joined", Lobby.getGamesJoined);
router.post("/games-can-join", Lobby.getGamesCanJoin);
router.post("/players", Lobby.getPlayersList);

export default router;
