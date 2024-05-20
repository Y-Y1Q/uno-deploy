export const SocketEvent = {
  // listen for chat msg in a room (0 for lobby, 1,2,3... for other room)
  CHAT: (gameId: any) => `chat-${gameId}`,

  // get real-time update in a waiting room (gameId: 1, 2, 3...)
  // message to show who joined
  // update num of player joined
  WAIT: (gameId: any) => `game-wait-${gameId}`,

  // get real-time update game state in a room (gameId: 1, 2, 3...)
  UPDATE: (gameId: any) => `game-state-update-${gameId}`,

  // real-time update in the lobby's game list
  LOBBY: "lobby-update",
};
