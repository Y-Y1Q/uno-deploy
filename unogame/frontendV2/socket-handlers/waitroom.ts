import { Socket } from "socket.io-client";

import { SocketEvent } from "../../constants/socket_event";

export function waitRoomHandler(socket: Socket) {
  const gameId = (document.getElementById("game-id") as HTMLInputElement | null)
    ?.value;
  const playersCount = document.getElementById(
    "players-count"
  ) as HTMLDivElement;
  const playersInGame = document.getElementById(
    "players-in-game"
  ) as HTMLDivElement;
  const selectElement = document.getElementById(
    "invPlayer"
  ) as HTMLSelectElement;

  socket.on(SocketEvent.WAIT(gameId), function (data) {
    playersCount.innerHTML = `${data.playersCount} / ${data.maxPlayers} players joined`;

    if (data.playersCount === data.maxPlayers) {
      selectElement.disabled = true;
    } else {
      selectElement.disabled = false;
    }

    // Display current players in waitroom
    let content = "";
    data.playersList.forEach((player) => {
      content += `<p>${player.username}</p>`;
    });

    playersInGame.innerHTML = content;
  });
}
