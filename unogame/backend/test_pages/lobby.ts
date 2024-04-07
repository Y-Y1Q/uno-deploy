import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("test_lobby");
});

export default router;
