import { findQuestionsByEquipment, createInteraction, findAllInteractions } from "./services.js";

export const getLLMQuestionsController = async (equipmentId) => {
  const questions = equipmentId ? await findQuestionsByEquipment(equipmentId) : await findAllQuestions();
  return questions || [];
};

export const getLLMInteractionsController = async (req, res) => {
  const interactions = await findAllInteractions();
  return interactions;
};

export const addInteractionController = async (equipmentDetails, finalLLMResponse) => {
  const responses = finalLLMResponse.map(({ question_id, user_response }) => {
    const matchedQuestion = equipmentDetails.questions.find((q) => q._id.toString() === question_id.toString());
    return {
      question_id: matchedQuestion._id,
      question_snapshot: {
        question_text: matchedQuestion.question_text,
        question_type: matchedQuestion.question_type,
        required: matchedQuestion.required || false,
        youtube_link: matchedQuestion.youtube_link || "",
        options: matchedQuestion.options || [],
        allowMultipleSelection: matchedQuestion.allowMultipleSelection || false,
      },
      user_response,
    };
  });

  const interactionPayload = {
    equipment_id: equipmentDetails._id,
    equipment_snapshot: {
      name: equipmentDetails.name,
    },
    industry_id: equipmentDetails.industry_id._id,
    industry_snapshot: {
      name: equipmentDetails.industry_id.name,
    },
    responses,
  };

  console.log("interaction", interactionPayload);

  const interaction = await createInteraction(interactionPayload);
  return interaction;
};
