import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    '<form action="/creategame" method="post">' +
      "TEST CREATE GAME <br>" +
      'Room Name: <input name="roomname"><br>'
  );
});

export default router;
