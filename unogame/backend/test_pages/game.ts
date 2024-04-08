import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    '<form action="/creategameroom" method="post">' +
      "TEST CREATE GAME <br>" +
      'Room Name: <input name="roomname">' +
      '<button type="submit">submit</button></form>' +
      "<br><br><br>" +
      '<form action="/getallgamerooms" method="post">' +
      "TEST GET ALL GAMEROOMS (all columns are included, filter after FE done)<br>" +
      '<button type="submit">submit</button></form>' +
      "<br><br><br>" +
      '<form action="/getgameroomsbyname" method="post">' +
      "TEST GET GAMEROOMS BY NAMES<br>" +
      'Room Name: <input name="roomname">' +
      '<button type="submit">submit</button></form>' +
      "<br><br><br>" +
      '<form action="/joingameroom" method="post">' +
      "TEST JOINING GAMEROOM, game id and user id required<br>" +
      "If you see empty data returned, it means good, the http code is 200<br>" +
      "If you see a message in json, it means bad, the http code is 4xx<br>" +
      'Room ID: <input name="roomid">' +
      'User ID: <input name="userid">' +
      '<button type="submit">submit</button></form>' +
      "<br><br><br>" +
      '<form action="/quitgameroom" method="post">' +
      "TEST QUITTING GAMEROOM, game id and user id required<br>" +
      "If you see empty data returned, it means good, the http code is 200<br>" +
      "Note that deleting unexisting row still works, but that is controlled by FE" +
      "If you see a message in json, it means bad, the http code is 4xx<br>" +
      'Room ID: <input name="roomid">' +
      'User ID: <input name="userid">' +
      '<button type="submit">submit</button></form>' +
      "<br><br><br>"
  );
});

export default router;
