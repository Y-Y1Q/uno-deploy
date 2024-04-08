import express from "express";
import { requestTime } from "../middleware/timestamp";
import * as Users from "../controllers/ctrl_users";

const router = express.Router();

router.use(requestTime);

router.post("/signup", Users.signUp);
router.post("/login", Users.logIn);
router.post("/logout", Users.logOut);

export default router;
