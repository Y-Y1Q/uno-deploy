import * as GamesDB from "./db_games";
import { addUser } from "./users";

async function addMockData() {
  // add mock user data
  // username, password: 123, fullname
  await addUser(
    "user123",
    "$2a$12$uVr4Fi1ww3fwlyjjSwf4PuK6AB40V7NRAvcW31sRxCWS7W9YDouWu",
    "one"
  );
  await addUser(
    "user2",
    "$2a$12$uVr4Fi1ww3fwlyjjSwf4PuK6AB40V7NRAvcW31sRxCWS7W9YDouWu",
    "two"
  );
  await addUser(
    "user3",
    "$2a$12$uVr4Fi1ww3fwlyjjSwf4PuK6AB40V7NRAvcW31sRxCWS7W9YDouWu",
    "three"
  );
  await addUser(
    "user4",
    "$2a$12$uVr4Fi1ww3fwlyjjSwf4PuK6AB40V7NRAvcW31sRxCWS7W9YDouWu",
    "four"
  );

  // add mock game room data,
  // all not started, and has only creator in the game
  await GamesDB.createGame("Gas Chamber", 4);
  await GamesDB.joinGame(1, 1);
  await GamesDB.setCreatorInGame(1, 1);

  await GamesDB.createGame("The War Room", 4);
  await GamesDB.joinGame(2, 2);
  await GamesDB.setCreatorInGame(2, 2);

  await GamesDB.createGame("Red Room", 4);
  await GamesDB.joinGame(3, 3);
  await GamesDB.setCreatorInGame(3, 3);

  await GamesDB.createGame("The Green Room", 4);
  await GamesDB.joinGame(4, 4);
  await GamesDB.setCreatorInGame(4, 4);

  await GamesDB.createGame("The Chamber of Secrets", 4);
  await GamesDB.joinGame(5, 1);
  await GamesDB.setCreatorInGame(5, 1);

  await GamesDB.createGame("Confederate Legacy Room", 4);
  await GamesDB.joinGame(6, 1);
  await GamesDB.setCreatorInGame(6, 1);

  await GamesDB.createGame("2P Room", 2);
  await GamesDB.joinGame(7, 2);
  await GamesDB.setCreatorInGame(7, 2);

  await GamesDB.createGame("3P Room", 3);
  await GamesDB.joinGame(8, 3);
  await GamesDB.setCreatorInGame(8, 3);

  // TODO - after game list is tested to working properly in lobby
  // add mock data for a started 2-Player room to test gameplay
  // with all types of UNO card in each player's hand
}

addMockData()
  .then(() => {
    console.log("Mock data added successfully.");
  })
  .catch((err) => {
    console.error("Error adding mock data: ", err);
  });
