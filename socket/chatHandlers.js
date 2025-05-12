import { predefinedQuesitons } from "../constants/predefinedQuestions.js";
export const chatHandlers = (io, socket) => {
  socket.on("sendMessage", async (data, callback) => {
    const relevantQuestions = predefinedQuesitons[data.type];
    console.log("message sent");
  });
};
