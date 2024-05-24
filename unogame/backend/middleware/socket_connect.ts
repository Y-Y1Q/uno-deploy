const handleSocketConnection = (socket) => {
  // Check if the socket has a user session
  if (socket.request.session.user !== undefined) {
    // Join the socket to a room identified by the user's ID
    socket.join(socket.request.session.user.id);
    console.log(
      `Username-${socket.request.session.user.username} id - ${socket.request.session.user.id} connected`
    );
  }
};

export { handleSocketConnection };
