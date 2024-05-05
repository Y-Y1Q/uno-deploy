import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("test/test_root");
});

export default router;
