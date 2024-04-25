const handleSocketConnection = (socket) => {
  //  Adds the socket to a room identified by the user's ID
  if (socket.request.session.user !== undefined) {
    socket.join(socket.request.session.user.id);
    console.log(`Username-${socket.request.session.user.username} UserId-${socket.request.session.user.id} connected`);
  }


  /* 
  
  TESTing - will update later
  
  
  */

  // Joins the socket to a room identified by the  parameter :id
  // For example /game/25231    /game/11  /game/4214 /game/Dsge%2sd


  // if (socket.handshake.query !== undefined) {
  //   // socket.join(socket.handshake.query.id);
  //   const {socketQuery} =  socket.handshake.query;
  //   console.log(`Socket query: ${socketQuery}`);
  // }

  // // Listen for 'chat:message' events
  // socket.on('chat:message', (data) => {
  //   // Broadcast the message to the room (in our case, lobby because '0')
  //   if (socket.request.session.user !== undefined) {
  //     socket.to(0).emit('chat:message', data);
  //   }
  // });
};

export { handleSocketConnection };
