import { db } from "../db_connection";

const createGameroom = async (roomName) => {
  const ret = await db.one(
    "INSERT INTO games (room_name) VALUES ($1) RETURNING id",
    [roomName]
  );

  return ret.id;
};

export { createGameroom };
