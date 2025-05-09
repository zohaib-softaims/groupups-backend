import { Server } from "socket.io";
import { setupSocketListeners } from "./socketManager.js";
import { sessionMiddleware } from "../middlewares/sessionMiddleware.js";

export let io;

export const initiateSocketServer = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.engine.use(sessionMiddleware);

  setupSocketListeners(io);
};
