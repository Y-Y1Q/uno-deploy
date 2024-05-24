import { chatMessageHandler } from "./chat-message";
import { gameStateUpdate } from "./game-state";
import { updateGamesList } from "./lobby-games";
import { waitRoomHandler } from "./waitroom";

export default [
  chatMessageHandler,
  waitRoomHandler,
  gameStateUpdate,
  updateGamesList,
];
