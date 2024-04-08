import { db } from "../db_connection";

const createGameroom = async (roomname) => {
  const ret = await db.one(
    "INSERT INTO games (room_name) VALUES ($1) RETURNING id",
    [roomname]
  );

  return ret.id;
};

const getAllGamerooms = async () => {
  const ret = await db.any("SELECT * FROM games");

  return ret;
};

export { createGameroom, getAllGamerooms };
