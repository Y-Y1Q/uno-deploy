import express from "express";
import { requestTime } from "../middleware/timestamp";
import * as Games from "../controllers/ctrl_games";

const router = express.Router();

router.use(requestTime);

router.post("/creategame", Games.createGame);

export default router;
