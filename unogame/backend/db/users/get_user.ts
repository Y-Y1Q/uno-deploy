import { db } from "../db_connection";

const GET_USER = "SELECT * FROM users WHERE username=$1";

const getUser = (username) => {
  return db.one(GET_USER, [username]);
};

export { getUser };
