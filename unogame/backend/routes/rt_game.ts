import express from "express";
import * as Games from "../controllers/ctrl_games";

const router = express.Router();

router.post("/creategameroom", Games.createGameroom);
router.post("/getallgamerooms", Games.getAllGamerooms);

export default router;
