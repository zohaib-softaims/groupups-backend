import { addInteractionController, getLLMQuestionsController } from "../features/Chatbot/controllers.js";
import { getLLMResponse } from "../lib/llmConfig.js";
import { generateLLMPrompt } from "../lib/llmPrompt.js";

export const chatHandlers = (io, socket) => {
  socket.on("sendMessage", async (data, callback) => {
    try {
      let systemPrompt;
      if (socket?.equipmentDetails) {
        systemPrompt = generateLLMPrompt(socket.equipmentDetails.name, socket.equipmentDetails.questions);
      } else {
        const equipmentDetails = await getLLMQuestionsController(data.type);
        socket.equipmentDetails = equipmentDetails;
        systemPrompt = generateLLMPrompt(equipmentDetails.name, equipmentDetails.questions);
      }
      const llmResponse = await getLLMResponse({
        systemPrompt,
        messages: data.messages,
      });
      const parsedLLMResponse = JSON.parse(llmResponse);
      if (parsedLLMResponse?.content?.finalResponse) {
        console.log("final", parsedLLMResponse.content.finalResponse);
        await addInteractionController(
          socket.equipmentDetails,
          parsedLLMResponse.content.finalResponse,
          parsedLLMResponse.content.user_name,
          parsedLLMResponse.content.user_email
        );
      }
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
