import { Socket } from "socket.io-client";

import { SocketEvent } from "../../constants/socket_event";
import { unoDisplay } from "../event-handlers/uno-display";

const gameStateInfo = document.getElementById(
  "game-state-info"
) as HTMLHeadingElement;

const gameId = (document.getElementById("game-id") as HTMLInputElement | null)
  ?.value;

const username = (
  document.getElementById("current-user-name") as HTMLInputElement | null
)?.value;

export function gameStateUpdate(socket: Socket) {
  socket.on(SocketEvent.UPDATE(gameId), function (data) {
    gameStateInfo.innerHTML =
      `YOU: ${username} <br>` +
      `TURN: ${data.user_this_turn_name}<br>` +
      `PENALTY: ${data.penalty}`;

    unoDisplay();
  });
}
