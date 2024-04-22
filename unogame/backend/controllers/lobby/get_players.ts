import * as UserDB from "../../db/db_users";
import HttpCode from "../../utilities/http_code";

// delete comment later
// get players list with id, username, fullname

const getPlayersList = async (req, res) => {
  
try{
    const playersList = await UserDB.getAllUsers();
    return res
    .status(HttpCode.OK)
    .json(playersList);

}catch(err){
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
}
};

export { getPlayersList };
