import { Socket } from "socket.io-client";

import { SocketEvent } from "../../constants/socket_event";
import { gameListHandler } from "../event-handlers/game-list";

export function updateGamesList(socket: Socket) {
  socket.on(SocketEvent.LOBBY, function () {
    gameListHandler();
  });
}
