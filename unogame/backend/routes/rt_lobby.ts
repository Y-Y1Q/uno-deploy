import express from "express";

import * as Lobby from "../controllers/ctrl_lobby";

const router = express.Router();

router.post("/games", Lobby.getGamesList);
router.post("/players", Lobby.getPlayersList);

export default router;
