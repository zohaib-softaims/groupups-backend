import { predefinedQuesitons } from "../constants/predefinedQuestions.js";
import { getLLMResponse } from "../lib/llmConfig.js";
import { generateLLMPrompt } from "../lib/llmPrompt.js";

export const chatHandlers = (io, socket) => {
  socket.on("sendMessage", async (data, callback) => {
    try {
      const relevantQuestions = predefinedQuesitons[data.type];
      console.log("data coming", data);
      const systemPrompt = generateLLMPrompt(relevantQuestions, data.type);

      const llmResponse = await getLLMResponse({
        systemPrompt,
        messages: data.messages,
      });

      console.log("llm response is", llmResponse);
      const parsedLLMResponse = JSON.parse(llmResponse);

      socket.emit("receiveMessage", {
        role: "assistant",
        content: llmResponse,
        progress: parsedLLMResponse?.progress,
      });
    } catch (error) {
      console.error("LLM processing error:", error);
      const fallbackResponse = JSON.stringify({
        content: "⚠️ Sorry, something went wrong while processing your request. Please try again.",
        progress: 0,
        error: true,
      });
      socket.emit("receiveMessage", {
        role: "assistant",
        content: fallbackResponse,
        progress: 0,
      });
    }
  });
};
