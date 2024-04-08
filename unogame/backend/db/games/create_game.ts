import { db } from "../db_connection";

const createGame = async (roomname) => {
  const ret = await db.one("INSERT INTO games (room_name) VALUES ($1) RETURNING id", [
    roomname,
  ]);

  return ret.id;
};

export { createGame };
