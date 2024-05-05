import { Socket, io } from "socket.io-client";

import eventHandlers from "./event-handlers";
import socketHandlers from "./socket-handlers";

// Provides us with type information on the io object
declare global {
  interface Window {
    socket: Socket;
  }
}

window.socket = io();

eventHandlers.forEach((handler) => handler());
socketHandlers.forEach((handler) => handler(window.socket));
