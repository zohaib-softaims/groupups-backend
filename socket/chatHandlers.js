import { getLLMQuestionsController } from "../features/Chatbot/controllers.js";
import { getLLMResponse } from "../lib/llmConfig.js";
import { generateLLMPrompt } from "../lib/llmPrompt.js";

export const chatHandlers = (io, socket) => {
  socket.on("sendMessage", async (data, callback) => {
    try {
      let systemPrompt;
      if (socket?.systemPrompt) {
        systemPrompt = socket?.systemPrompt;
        console.log("using socket questions");
      } else {
        console.log("fetched questions");
        const equipmentDetails = await getLLMQuestionsController(data.type);
        systemPrompt = generateLLMPrompt(equipmentDetails.name, equipmentDetails.questions);
        socket.systemPrompt = systemPrompt;
      }
      const llmResponse = await getLLMResponse({
        systemPrompt,
        messages: data.messages,
      });
      console.log("llm response", llmResponse);
      socket.emit("receiveMessage", {
        role: "assistant",
        content: llmResponse,
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
