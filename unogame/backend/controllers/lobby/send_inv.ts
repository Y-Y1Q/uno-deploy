import { getUser } from "../../db/users";

// DELETE COMMENT LATER 
// Pre-condition: the sender is in the wait-room of a game (according to FE wireframe)
// request body: username - can fetch from /lobby/players
// send invite message to a user
const sendInvitation = async (req, res) => {
  const { id: roomId } = req.params; //   params - someurl/:id  (placeholder)
  const { username: toUser } = req.body;  // in FE, sender should choose from a players list
  const { username: fromUser } = req.session.user; // sender 
  const { id: fromUserId } = req.session.user;
  const { id: toUserId } = await getUser(toUser);


  
  if ( fromUserId !== toUserId){

  const msg = `${fromUser} invite you to join ${roomId}.`; 

  const io = req.app.get("io");

  // send inv message to the toUser's lobby

  io.to(toUserId).emit(`chat:message:0`, {
    from: "SYSTEM",
    timestamp: Date.now(),
    room: roomId, // may use room to fetch /game/${room}/join in the FE
    message: msg,
  });

  }
  

  return res.sendStatus(200);
};

export { sendInvitation };
