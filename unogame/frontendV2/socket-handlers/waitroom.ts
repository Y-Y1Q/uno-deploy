import { Socket } from "socket.io-client";

import { SocketEvent } from "../../constants/socket_event";

const playGameButton = document.getElementById(
  "playGameButton"
) as HTMLButtonElement;
const gameId = (document.getElementById("game-id") as HTMLInputElement | null)
  ?.value;
const playersCount = document.getElementById("players-count") as HTMLDivElement;
const playersInGame = document.getElementById(
  "players-in-game"
) as HTMLDivElement;
const selectElement = document.getElementById("invPlayer") as HTMLSelectElement;
// const userId = (
//   document.getElementById("current-user-id") as HTMLInputElement | null
// )?.value;

export function waitRoomHandler(socket: Socket) {
  socket.on(SocketEvent.WAIT(gameId), function (data) {
    playersCount.innerHTML = `${data.playersCount} / ${data.maxPlayers} players joined`;

    const isFull = data.playersCount === data.maxPlayers;
    selectElement.disabled = isFull;
    playGameButton.disabled = !isFull;

    // Display current players in waitroom
    let content = "";
    data.playersList.forEach((player) => {
      content += `<p>${player.username}</p>`;
    });

    playersInGame.innerHTML = content;
  });
}
