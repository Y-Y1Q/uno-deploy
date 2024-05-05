const handleSocketConnection = (socket) => {
  // Check if the socket has a user session
  if (socket.request.session.user !== undefined) {
    const { request } = socket;

    // Middleware to reload session to ensure reliability
    socket.use((_, next) => {
      request.session.reload((error) => {
        if (error) {
          socket.disconnect(); // Disconnect socket on session reload error
        } else {
          next(); // Continue with socket connection
        }
      });
    });

    // Join the socket to a room identified by the user's ID
    socket.join(socket.request.session.user.id);
    console.log(
      `Username-${socket.request.session.user.username} UserId-${socket.request.session.user.id} connected`
    );

    // Handle socket disconnection
    socket.on("disconnect", () => {
      console.log(
        `Username-${socket.request.session.user.username} UserId-${socket.request.session.user.id} disconnected`
      );
    });
  }
};

export { handleSocketConnection };
