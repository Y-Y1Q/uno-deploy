import { db } from "../db_connection";

const ADD_USER =
  "INSERT INTO users (username, password, fullname) VALUES ($1, $2, $3) RETURNING id, username, fullname";

const addUser = (username, password, fullname) => db.one(ADD_USER, [username, password, fullname]);

export { addUser };
