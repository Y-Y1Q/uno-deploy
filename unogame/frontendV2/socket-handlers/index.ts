import { chatMessageHandler } from "./chat-message";

export default [chatMessageHandler];

//Socket handler template
/*
import { Socket } from "socket.io-client";
import { SOCKET_EVENT } from "../../constants/socket_event";

const something = document.getElementById("someId") as someHTMLElement

export function someFunc(socket: Socket) {
  if (something) {

    // BE route will render EJS page with some values  
    // 0 - lobby
    // 1,2,3...  - game id
    const gameId = ( document.getElementById("game-id") as HTMLInputElement | null)?.value;

    // listening from someEvent related to gameId
    // socket event list is in /unogame/constants/socket_event.ts
    socket.on(SOCKET_EVENT.someEvent(gameId), function (data) {
        // do something with data
    });
  }
}

*/
