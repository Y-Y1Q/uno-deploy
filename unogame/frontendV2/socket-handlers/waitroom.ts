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

  socket.on(SocketEvent.WAIT(gameId), function (data) {
    playersCount.innerHTML = `${data.playersCount} / ${data.maxPlayers} players joined`;

    let content = "";
    data.playersList.forEach((player) => {
      content += `<p>${player.username}</p>`;
    });

    console.log(content);

    playersInGame.innerHTML = content;
  });
}
