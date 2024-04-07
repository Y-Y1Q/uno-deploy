import express from "express";
import * as Users from "../controllers/ctrl_users";

const router = express.Router();

router.post("/signup", Users.signUp);
router.post("/login", Users.logIn);
router.post("/logout", Users.logOut);

export default router;
