import bcrypt from "bcryptjs";

import * as UsersDB from "../../db/db_users";
import HttpCode from "../../utilities/http_code";

const SALT_ROUNDS = 10;

const signUp = async (req, res) => {
  console.log(req.body);
  const { username, password, fullname } = req.body;

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
