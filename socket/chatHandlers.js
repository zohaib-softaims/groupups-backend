import { predefinedQuesitons } from "../constants/predefinedQuestions.js";
import { getLLMResponse } from "../lib/llmConfig.js";
import { generateLLMPrompt } from "../lib/llmPrompt.js";

export const chatHandlers = (io, socket) => {
  socket.on("sendMessage", async (data, callback) => {
    console.log("data is", data);
    const relevantQuestions = predefinedQuesitons[data.type];
    const systemPrompt = generateLLMPrompt(relevantQuestions, data.type);
    const llmResponse = await getLLMResponse({
      systemPrompt,
      messages: data.messages,
    });
    console.log("llm response is", llmResponse);
    socket.emit("receiveMessage", {
      role: "assistant",
      content: llmResponse,
    });
  });
};
