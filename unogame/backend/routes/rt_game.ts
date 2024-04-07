import express from "express";
import * as Games from "../controllers/ctrl_games";

const router = express.Router();

router.post("/creategame", Games.createGame);

export default router;
