import * as UsersDB from "../../db/db_users";
import HttpCode from "../../utilities/http_code";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

const signUp = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const userExists = await UsersDB.foundUser(username);

    if (userExists) {
      return res
        .status(HttpCode.BadRequest)
        .json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await UsersDB.addUser(username, hash);

    req.session.user.id = newUser.id;
    req.session.user.username = newUser.username;

    return res.status(HttpCode.Created).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error" });
  }
};

export { signUp };
