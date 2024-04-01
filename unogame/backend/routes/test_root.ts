import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    '<form action="/login" method="post">' +
      "TEST LOGIN" +
      "<br></br>" +
      'Username: <input name="username"><br>' +
      'Password: <input name="password" type="password"><br>' +
      '<input type="submit" value="Login"></form>' +
      "<br></br>" +
      '<form action="/signup" method="post">' +
      "<br></br>" +
      "<br></br>" +
      "TEST SIGNUP" +
      "<br></br>" +
      'Username: <input name="username"><br>' +
      'Password: <input name="password" type="password"><br>' +
      '<input type="submit" value="Signup"></form>'
  );
});

export default router;
