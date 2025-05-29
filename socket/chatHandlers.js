import { addInteractionController, getLLMQuestionsController, getProductsByEquipmentController } from "../features/Chatbot/controllers.js";
import { generateFinalLLMPrompt } from "../lib/finalResponseLLMPrompt.js";
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
        console.log("equipment details are", equipmentDetails);
        socket.equipmentDetails = equipmentDetails;
        systemPrompt = generateLLMPrompt(equipmentDetails.name, equipmentDetails.questions);
      }
      let llmResponse = await getLLMResponse({
        systemPrompt,
        messages: data.messages,
      });
      console.log("llm response", llmResponse);
      const parsedLLMResponse = JSON.parse(llmResponse);
      if (parsedLLMResponse?.content?.isQuestionsCompleted) {
        let finalSystemPrompt = generateFinalLLMPrompt(socket?.equipmentDetails?.questions);
        let finalLLMResponse = await getLLMResponse({
          systemPrompt: finalSystemPrompt,
          messages: data.messages,
        });
        console.log("final llm response", finalLLMResponse);
        const parsedFinalLLMResponse = JSON.parse(finalLLMResponse);
        await addInteractionController(
          socket.equipmentDetails,
          parsedFinalLLMResponse.content.finalResponse,
          parsedFinalLLMResponse.content.user_name,
          parsedFinalLLMResponse.content.user_email
        );
        const recommendedProducts = await getProductsByEquipmentController(socket?.equipmentDetails?._id);
        parsedLLMResponse.content.recommendedProducts = recommendedProducts;
        llmResponse = JSON.stringify(parsedLLMResponse);
      }
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
