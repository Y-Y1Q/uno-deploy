import { Socket } from "socket.io-client";

import { SocketEvent } from "../../constants/socket_event";
import {
  displayCards,
  displayDiscard,
  displayOpponents,
  unoDisplay,
} from "../event-handlers/uno-display";

const gameStateInfo = document.getElementById(
  "game-state-info"
) as HTMLHeadingElement;
// const cardContainer = document.getElementById("cardContainer") as HTMLDivElement;
// const discardPileContainer = document.getElementById("discardPileContainer") as HTMLDivElement;

const drawButton = document.getElementById("drawButton") as HTMLButtonElement;
const sayUnoButton = document.getElementById(
  "sayUnoButton"
) as HTMLButtonElement;

const gameId = (document.getElementById("game-id") as HTMLInputElement | null)
  ?.value;
const userId = (
  document.getElementById("current-user-id") as HTMLInputElement | null
)?.value;
const username = (
  document.getElementById("current-user-name") as HTMLInputElement | null
)?.value;

export function gameStateUpdate(socket: Socket) {
  socket.on(SocketEvent.UPDATE(gameId), function (data) {
    console.log("======Client Socket===============");

    // disable draw button if it not player's turn
    // const notYourTurn = userId !== data.user_this_turn
    // drawButton.disabled = notYourTurn;
    // drawButton.classList.toggle("disabled:opacity-25", notYourTurn)

    // // disable Say Uno button if there is more than one card
    // const noUno = data.current_user_cards.length > 1
    // sayUnoButton.disabled = noUno;
    // sayUnoButton.classList.toggle("disabled:opacity-25", noUno);

    gameStateInfo.innerHTML = `${data.currentRoom}<br> YOU: ${username}
        <br>
        TURN:${data.user_this_turn_name}`;

    unoDisplay();
  });
}
