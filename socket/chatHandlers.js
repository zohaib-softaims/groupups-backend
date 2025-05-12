export const chatHandlers = (io, socket) => {
  socket.on("sendMessage", async (message, callback) => {
    console.log("message sent", message);
  });
};
