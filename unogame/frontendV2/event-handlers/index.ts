import { sendMessage } from "./chat-form";
import { drawCard } from "./draw-card";
import { gameListHandler } from "./game-list";
import { invite } from "./inv-player";
import { sayUno } from "./say-uno";
import { unoDisplay } from "./uno-display";

export default [
  sendMessage,
  invite,
  drawCard,
  sayUno,
  unoDisplay,
  gameListHandler,
];
