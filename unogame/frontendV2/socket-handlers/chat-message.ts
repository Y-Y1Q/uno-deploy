import { Socket } from "socket.io-client";

import { SOCKET_EVENT } from "../../constants/socket_event";

const chatbox = document.getElementById("chatbox") as HTMLDivElement;

export default function (socket: Socket) {
  if (chatbox) {
    const gameId = (
      document.getElementById("game-id") as HTMLInputElement | null
    )?.value;

    socket.on(SOCKET_EVENT.CHAT(gameId), function (data) {
      const newMessage = document.createElement("div");
      newMessage.classList.add("flex", "justify-start", "mb-2");

      const messageBubble = document.createElement("div");
      messageBubble.classList.add(
        "bg-green-200",
        "text-green-700",
        "rounded",
        "py-2",
        "px-4"
      );
      messageBubble.innerHTML = `<p>${data.message}</p><p class="text-left font-bold">${data.from}</p>`;

      newMessage.appendChild(messageBubble);
      chatbox.appendChild(newMessage);
      chatbox.scrollTop = chatbox.scrollHeight;
    });
  }
}
