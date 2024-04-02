import { db } from "../db_connection";

const createGame = (roomname) =>
  db.one(
    "INSERT INTO games (room_name) VALUES ($1) RETURNING id",
    [roomname]
  );

export { createGame };
