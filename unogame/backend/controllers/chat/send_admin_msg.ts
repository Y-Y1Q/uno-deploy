import { SocketEvent } from "../../../constants/socket_event";
import * as GamesDB from "../../db/db_games";
import * as UsersDB from "../../db/db_users";

export async function unoMsg(gameId, userId, msg, req) {
  const io = req.app.get("io");
  const { username } = await UsersDB.getUserById(userId);
  const message = `<b>${username}</b> ` + msg;

  io.emit(SocketEvent.CHAT(gameId), {
    from: "ADMIN",
    gameId,
    userId,
    timestamp: Date.now(),
    message,
  });
}

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

  const { username: name } = await UsersDB.getUserById(userId);

  const winnerMsg = [
    `<h1><b>${name}</b>: If winning was an art, consider me da Vinci.</h1>`,
    `<h1><b>${name}</b>: Time to update my resume with this win.</h1>`,
    `<h1><b>${name}</b>: GG!</h1>`,
  ];

  const randomIndex = Math.floor(Math.random() * winnerMsg.length);
  const randomMsg = winnerMsg[randomIndex];

  io.emit(SocketEvent.CHAT(gameId), {
    from: "ADMIN",
    gameId,
    winMsg: randomMsg,
    timestamp: Date.now(),
    message: "win",
  });

  // CASE: There is a winner in game
  // Delete all cards and end the game after the 6 sec
  // All Player will be redirect to waitroom to start again
  setTimeout(async () => {
    await GamesDB.deleteAllCards(gameId);
    await GamesDB.endGame(gameId);
  }, 6000);
}
