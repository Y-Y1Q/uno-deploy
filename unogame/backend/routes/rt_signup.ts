import express from "express";
import * as Users from "../controllers/ctrl_users";

const router = express.Router();

router.post("/signup", Users.signUp);

export default router;