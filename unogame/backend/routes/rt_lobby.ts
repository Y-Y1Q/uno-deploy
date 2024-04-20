import express from "express";
import { chatController } from "../controllers/ctrl_chat";

const router = express.Router();

router.post("/chat", chatController);

// Todo
// router.get("/get-games-joined", Lobby. );
// router.get("/get-games-can-join", Lobby. );
// router.get("/get-players", Lobby. ); 
// router.post("/send-inv", Lobby. ); 

export default router;
