import { db } from "../db_connection";

const getGameroomsByName = async (roomName) => {
  const ret = await db.any(
    "SELECT * FROM games WHERE room_name LIKE '%" + roomName + "%'"
  );

  return ret;
};

export { getGameroomsByName };
