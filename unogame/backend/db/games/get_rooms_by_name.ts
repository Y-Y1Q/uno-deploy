import { db } from "../db_connection";

const getGameroomsByName = async (roomname) => {
  const ret = await db.any(
    "SELECT * FROM games WHERE room_name LIKE '%" + roomname + "%'"
  );

  return ret;
};

export { getGameroomsByName };
