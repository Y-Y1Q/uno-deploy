import { db } from "../db_connection";

const addUser = async (username, password, fullname) => {
  return await db.one(
    "INSERT INTO users (username, password, fullname) VALUES ($1, $2, $3) RETURNING id, username, fullname",
    [username, password, fullname]
  );
};

const foundUser = async (username: string): Promise<boolean> => {
  return await db
    .one("SELECT username FROM users WHERE username=$1", [username])
    .then(() => true)
    .catch(() => false);
};

const getAllUsers = async () => {
  return await db.manyOrNone("SELECT id, username, fullname FROM users");
};

const getUser = async (username) => {
  return await db.one("SELECT * FROM users WHERE username=$1", [username]);
};

const getUserById = async (userId) => {
  return await db.one("SELECT * FROM users WHERE id=$1", [userId]);
};

export { addUser, foundUser, getAllUsers, getUser, getUserById };
