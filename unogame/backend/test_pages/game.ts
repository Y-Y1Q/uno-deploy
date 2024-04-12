import express from "express";

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.render("test_game", {id} );
});

export default router;
