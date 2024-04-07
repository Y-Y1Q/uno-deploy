const handleSocketConnection = (socket) => {
  if (socket.request.session.user !== undefined) {
    socket.join(socket.request.session.user.id);
    console.log(`User ${socket.request.session.user.username} connected`);
  }

  if (socket.handshake.query !== undefined) {
    socket.join(socket.handshake.query.id);
  }
};

export { handleSocketConnection };
