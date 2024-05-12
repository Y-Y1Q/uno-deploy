import { Socket } from "socket.io-client";

import { SocketEvent } from "../../constants/socket_event";

const chatbox = document.getElementById("chatbox") as HTMLDivElement;

export function chatMessageHandler(socket: Socket) {
  if (chatbox) {
    const gameId = (
      document.getElementById("game-id") as HTMLInputElement | null
    )?.value;

    const username = (
      document.getElementById("current-user-name") as HTMLInputElement | null
    )?.value;

    socket.on(SocketEvent.CHAT(gameId), function (data) {
      const newMessage = document.createElement("div");
      newMessage.classList.add("flex", "justify-start", "mb-2");
      const messageBubble = document.createElement("div");
      const messageAvatar = document.createElement("div");

      if (data.message === "start" && data.from === "ADMIN") {
        setTimeout(() => {
          window.location.href = `/game/${data.gameId}`;
        }, 1000);
      } else if (data.from === "ADMIN") {
        messageBubble.classList.add(
          "bg-orange-200",
          "text-orange-700",
          "rounded",
          "py-2",
          "px-4"
        );
        newMessage.classList.add("justify-end");
        messageBubble.innerHTML = `<p>${data.message}</p><p class="text-right font-bold">${data.from}</p>`;
        newMessage.appendChild(messageBubble);
        newMessage.appendChild(messageAvatar);
      } else if (data.from !== username) {
        messageBubble.classList.add(
          "bg-blue-200",
          "text-blue-700",
          "rounded",
          "py-2",
          "px-4"
        );
        messageAvatar.classList.add("ml-2");
        newMessage.classList.add("justify-end");

        messageBubble.innerHTML = `<p>${data.message}</p><p class="text-right font-bold">${data.from}</p>`;

        newMessage.appendChild(messageBubble);
        newMessage.appendChild(messageAvatar);
      } else {
        messageBubble.classList.add(
          "bg-green-200",
          "text-green-700",
          "rounded",
          "py-2",
          "px-4"
        );
        messageAvatar.classList.add("mr-2");

        messageBubble.innerHTML = `<p>${data.message}</p><p class="text-left font-bold">${data.from}</p>`;

        newMessage.appendChild(messageAvatar);
        newMessage.appendChild(messageBubble);
      }

      if (data.avatar) {
        messageAvatar.innerHTML = data.avatar;
      }

      chatbox.appendChild(newMessage);
      chatbox.scrollTop = chatbox.scrollHeight;
    });
  }
}
