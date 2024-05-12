// TODO
// Additional chat features
// send message to all users in a lobby, when a game is created
// send message to all users in a game, when a card is played
// ...
import { SocketEvent } from "../../../constants/socket_event";
import * as GamesDB from "../../db/db_games";
import * as UsersDB from "../../db/db_users";

// import * as GamesDB from "../../db/db_games";

export async function waitroomStartMsg(gameId, req) {
  const io = req.app.get("io");

  io.emit(SocketEvent.CHAT(gameId), {
    from: "ADMIN",
    gameId,
    timestamp: Date.now(),
    message: "start",
  });
}

export async function winningMsg(gameId, userId, req) {
  const io = req.app.get("io");

  const username = await UsersDB.getUserById(userId);

  const winnerMsg = [
    `<b>${username}</b>: If winning was an art, consider me da Vinci.`,
    `<b>${username}</b>: Time to update my resume with this win.`,
    `GG! <b>${username}</b>`,
  ];

  const randomIndex = Math.floor(Math.random() * winnerMsg.length);
  const randomMsg = JSON.stringify(winnerMsg[randomIndex]);

  io.emit(SocketEvent.CHAT(gameId), {
    from: "ADMIN",
    gameId,
    winMsg: randomMsg,
    timestamp: Date.now(),
    message: "win",
  });

  //End game status
  // Delete all cards and end the game after the 6 sec
  // All Player will be redirect to waitroom to start again
  // To-be-decided: delete the game record from DB
  setTimeout(async () => {
    await GamesDB.deleteAllCards(gameId);
    await GamesDB.endGame(gameId);
  }, 6000);
}
