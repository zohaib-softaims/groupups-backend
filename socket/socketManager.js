import { addUserSocket, removeUserSocket } from "./connectedUsers.js";
import { chatHandlers } from "./chatHandlers.js";

export const setupSocketListeners = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket session is`, socket.request.session.id);
    console.log(`User connected with socket ID: ${socket.id}`);

    chatHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(`User disconnected for socket ID: ${socket.id}`);
    });
  });
};
