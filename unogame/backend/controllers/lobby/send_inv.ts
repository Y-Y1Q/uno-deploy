// Pre-condition: the sender is in the wait room of a game (according to FE wireframe)
// Input: username, id - can be fetch from /lobby/get-players
// send invite message to a user 
// sample url /game/:id/wait  or something similar
const sendInvitation = (req, res) => {
  const { id: roomId } = req.params; //   params - someurl/:id  (placeholder)
  const { username: toUser } = req.body;
  const { id: toUserId } = req.body;
  const { username: fromUser } = req.session.user;

  const msg = `${fromUser} invite you to join ${roomId}.`;

  const io = req.app.get("io");


  console.log( `${fromUser} inv ${toUser} to join ${roomId}` );

  // send inv message to the toUser's lobby
  
  io.to(toUserId).emit(`chat:message:0`, {

    from: fromUser,
    timestamp: Date.now(),
    room: roomId, // may use room to fetch /game/${room}/join in the FE
    message: msg,
  });

  res.sendStatus(200);
};

export { sendInvitation };