import express from "express";

const router = express.Router();

router.get("/creategameroom", (req, res) => {
  res.send(
    '<form action="/creategameroom" method="post">' +
      "TEST CREATE GAME <br>" +
      'Room Name: <input name="roomname"><br>'
  );
});

export default router;
