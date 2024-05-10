import { SocketEvent } from "../../../constants/socket_event";
import * as GamesDB from "../../db/db_games";
import * as UsersDB from "../../db/db_users";

export async function waitroomUpdate(gameId, userId, req) {
  const io = req.app.get("io");

  // send welcome msg in waitroom chat
  const { username: userJoined } = await UsersDB.getUserById(userId);

  const welcomeMessages = [
    `Welcome to the game! <b>${userJoined}</b>`,
    `UNO GOD <b>${userJoined}</b> showed up!`,
    `A GPT trained bot <b>${userJoined}</b> has spawned in the game`,
  ];

  const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
  const randomWelcomeMessage = welcomeMessages[randomIndex];

  io.emit(SocketEvent.CHAT(gameId), {
    from: "ADMIN",
    timestamp: Date.now(),
    message: randomWelcomeMessage,
  });

  // update waitroom info
  const usersInGame = await GamesDB.getUsersnameInGame(gameId);
  const playersCount = usersInGame.length;
  const { max_players: maxPlayers } = await GamesDB.getGameById(gameId);

  io.emit(SocketEvent.WAIT(gameId), {
    timestamp: Date.now(),
    playersCount,
    maxPlayers,
    playersList: usersInGame,
  });
}
