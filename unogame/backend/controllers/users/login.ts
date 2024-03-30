import * as UsersDB from "../../db/db_users";
import HttpCode from "../../utilities/http_code";
import bcrypt from "bcryptjs";

const logIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UsersDB.getUser(username);
    const isPasswordSame = await bcrypt.compare(password, user.password);

    if (isPasswordSame) {
      req.session.user = {
        id: user.id,
        username: user.username,
      };

      return res.status(HttpCode.OK).redirect("/lobby");
    } else {
      return res
        .status(HttpCode.Forbidden)
        .json({ error: "Invalid username/password" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error" });
  }
};

export { logIn };
