import bcrypt from "bcryptjs";

import HttpCode from "../../../constants/http_code";
import * as UsersDB from "../../db/db_users";

const logIn = async (req, res) => {
  const { username, password } = {
    username: req.body.username.trim(),
    password: req.body.password.trim(),
  };

  // Redirect to lobby if user is already logged in
  if (req.session.user !== undefined) {
    req.flash(
      "error",
      "You are already logged in as: " + req.session.user.username
    );
    return res.redirect("/lobby");
  }

  try {
    const userExists = await UsersDB.foundUser(username);

    if (!userExists) {
      req.flash("error", username + " does not exist");
      return res.redirect("/login");
    }

    const user = await UsersDB.getUser(username);
    const isPasswordSame = await bcrypt.compare(password, user.password);

    if (isPasswordSame) {
      req.session.user = {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
      };

      return res.redirect("/lobby");
    } else {
      req.flash("error", "Invalid username/password");
      return res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error" });
  }
};

export { logIn };
