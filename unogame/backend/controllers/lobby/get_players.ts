import HttpCode from "../../../constants/http_code";
import * as UserDB from "../../db/db_users";

const getPlayersList = async (req, res) => {
  const { id: userId } = req.session.id;
  try {
    const playersList = await UserDB.getAllUsersExcept(userId);
    return res.status(HttpCode.OK).json(playersList);
  } catch (err) {
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
  }
};

export { getPlayersList };
