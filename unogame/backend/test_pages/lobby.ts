import express from "express";
import { requestTime } from "../middleware/timestamp";

const router = express.Router();

// Todo
const testLogout = `
<form action="/logout" method="post">
  <button type="submit">Logout</button>
</form>
`;

router.get("/", (req, res) => {
  res.send(" Test Lobby " + testLogout);
});

export default router;
