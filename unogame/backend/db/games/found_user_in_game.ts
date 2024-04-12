import { db } from "../db_connection";

const IS_USER_IN_GAME =
  "SELECT * FROM game_users WHERE game_id=$1 AND user_id=$2";

const foundUserInGame = (gameId: number, userId: number): Promise<boolean> => {
  return db
    .one(IS_USER_IN_GAME, [gameId, userId])
    .then(() => true)
    .catch(() => false);
};

export { foundUserInGame };
