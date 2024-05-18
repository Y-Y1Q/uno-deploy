import { db } from "./db_connection";
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

  // Game room used for DEBUG
  // 2 Players:  user123, user2
  // Last card played: Yellow wild
  // Every player will have same set of special cards
  await GamesDB.createGame("DEBUG ROOM", 2);
  await GamesDB.joinGame(9, 1);
  await GamesDB.setCreatorInGame(9, 1);
  await GamesDB.joinGame(9, 2);
  await db.query(`
  UPDATE games SET started=TRUE,last_user=NULL,last_card_played=108 WHERE id=9;`);
  for (let i = 1; i < 3; i++) {
    await GamesDB.testCards(9, i, 20);
    await GamesDB.testCards(9, i, 22);
    await GamesDB.testCards(9, i, 24);
    await GamesDB.testCards(9, i, 47);
    await GamesDB.testCards(9, i, 49);
    await GamesDB.testCards(9, i, 51);
    await GamesDB.testCards(9, i, 80);
    await GamesDB.testCards(9, i, 81);
    await GamesDB.testCards(9, i, 107);
    await GamesDB.testCards(9, i, 108);
  }
}

await addMockData()
  .then(() => {
    console.log("Adding mock data...");
  })
  .catch((err) => {
    console.error("Error adding mock data: ", err);
  });
