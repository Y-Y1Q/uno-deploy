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

const getGameroomsByName = async (roomname) => {
  const ret = await db.any(
    "SELECT * FROM games WHERE room_name LIKE '%" + roomname + "%'"
  );

  return ret;
};

export { createGameroom, getAllGamerooms, getGameroomsByName };
