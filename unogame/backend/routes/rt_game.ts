import express from "express";
import * as Games from "../controllers/ctrl_games";

const router = express.Router();

router.post("/creategameroom", Games.createGameroom);

export default router;
