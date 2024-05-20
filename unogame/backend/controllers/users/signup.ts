import bcrypt from "bcryptjs";

import HttpCode from "../../../constants/http_code";
import * as UsersDB from "../../db/db_users";

const SALT_ROUNDS = 12;

const signUp = async (req, res) => {
  console.log(req.body);
  const { username, password, fullname } = {
    username: req.body.username.trim(),
    password: req.body.password.trim(),
    fullname: req.body.fullname.trim(),
  };

  // Redirect to lobby if user is already logged in
  if (req.session.user !== undefined) {
    req.flash(
      "error",
      "You are already logged in as: " + req.session.user.username
    );
    return res.redirect("/lobby");
  }

  // name "admin" is not allowed, ignoring case
  if (checkName(username) || checkName(fullname)) {
    req.flash("error", "Invalid username/fullname to use");
    return res.redirect("/signup");
  }

  try {
    const userExists = await UsersDB.foundUser(username);

    if (userExists) {
      req.flash("error", username + " is taken");
      return res.redirect("/signup");
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    await UsersDB.addUser(username, hash, fullname);

    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error" });
  }
};

function checkName(str: string): boolean {
  return str.toUpperCase() === "ADMIN";
}

export { signUp };
