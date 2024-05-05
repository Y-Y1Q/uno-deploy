import express from "express";

import * as Chat from "../controllers/ctrl_chat";

const router = express.Router();

// will not perform authentication/in-game check here
// those checks will be handled inside rt_website.ts for GET request

router.post("/chat/:id", Chat.sendMessage);
router.post("/send-inv/:id", Chat.sendInvitation);

export default router;
