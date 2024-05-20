import { Socket } from "socket.io-client";

import { SocketEvent } from "../../constants/socket_event";
import { unoDisplay } from "../event-handlers/uno-display";

const gameStateInfo = document.getElementById(
  "game-state-info"
) as HTMLHeadingElement;
// const cardContainer = document.getElementById("cardContainer") as HTMLDivElement;
// const discardPileContainer = document.getElementById("discardPileContainer") as HTMLDivElement;

const gameId = (document.getElementById("game-id") as HTMLInputElement | null)
  ?.value;
// const userId = (
//   document.getElementById("current-user-id") as HTMLInputElement | null
// )?.value;
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

/*
TO BE DECIDED

const drawButton = document.getElementById("drawButton") as HTMLButtonElement;

const sayUnoButton = document.getElementById(
  "sayUnoButton"
) as HTMLButtonElement;

const userId = (
  document.getElementById("current-user-id") as HTMLInputElement | null
)?.value;

    disableButton(drawButton, userId !== data.user_this_turn);
      disableButton(sayUnoButton, data.current_user_cards.length > 1);

function disableButton(button, condition) {
  button.disabled = condition;
  button.classList.toggle("disabled:opacity-25", condition);
}




*/
