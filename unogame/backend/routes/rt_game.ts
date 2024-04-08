import express from "express";
import * as Games from "../controllers/ctrl_games";

const router = express.Router();

router.post("/creategameroom", Games.createGameroom);
router.post("/getallgamerooms", Games.getAllGamerooms);
router.post("/getgameroomsbyname", Games.getGameroomsByName);
router.post("/joingameroom", Games.joinGameroom);
router.post("/quitgameroom", Games.quitGameroom);

export default router;
