import bcrypt from "bcryptjs";

import * as UsersDB from "../../db/db_users";
import HttpCode from "../../utilities/http_code";

const SALT_ROUNDS = 10;

const signUp = async (req, res) => {
  console.log(req.body);
  const { username, password, fullname } = req.body;

  if (checkName(username) || checkName(fullname)) {
    return res.status(HttpCode.BadRequest).json({
      error: "Invalid username/fullname to use",
    });
  }

  if (req.session.user !== undefined) {
    return res.status(HttpCode.BadRequest).json({
      error: "You are already logged in as: " + req.session.user.username,
    });
  }

  try {
    const userExists = await UsersDB.foundUser(username);

    if (userExists) {
      return res
        .status(HttpCode.BadRequest)
        .json({ error: username + " is taken" });
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await UsersDB.addUser(username, hash, fullname);

    return res.redirect("/login");

    // req.session.user = {
    //   id: newUser.id,
    //   username: newUser.username,
    // };

    // return res
    //   .status(HttpCode.Created)
    //   .json({ message: username + " created" });
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
