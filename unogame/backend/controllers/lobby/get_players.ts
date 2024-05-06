import HttpCode from "../../../constants/http_code";
import * as UserDB from "../../db/db_users";

// delete comment later
// get players list with id, username, fullname

const getPlayersList = async (req, res) => {
  try {
    const playersList = await UserDB.getAllUsers();
    return res.status(HttpCode.OK).json(playersList);
  } catch (err) {
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
  }
};

export { getPlayersList };
