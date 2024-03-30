import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    '<form action="/user/login" method="post">' +
      "LOGIN" +
      "<br></br>" +
      'Username: <input name="username"><br>' +
      'Password: <input name="password" type="password"><br>' +
      '<input type="submit" text="Login"></form>' +
      "<br></br>" +
      '<form action="/user/signup" method="post">' +
      "<br></br>" +
      "<br></br>" +
      "SIGNUP" +
      "<br></br>" +
      'Username: <input name="username"><br>' +
      'Password: <input name="password" type="password"><br>' +
      '<input type="submit" text="Signup"></form>'
  );
});

export default router;
