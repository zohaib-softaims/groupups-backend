export const chatHandlers = (io, socket) => {
  socket.on("sendMessage", async (message, callback) => {
    console.log("message sent");
    if (socket.request.session.chat) {
      socket.request.session.chat = [...socket.request.session.chat, message];
    } else {
      socket.request.session.chat = [message];
    }
    console.log("session is now", socket.request.session.chat);
  });
};
