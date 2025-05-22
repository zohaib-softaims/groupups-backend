import { findQuestionsByEquipment, createInteraction, findAllInteractions } from "./services.js";

export const getLLMQuestionsController = async (equipmentId) => {
  const questions = equipmentId ? await findQuestionsByEquipment(equipmentId) : await findAllQuestions();
  return questions || [];
};

export const getLLMInteractionsController = async (req, res) => {
  const interactions = await findAllInteractions();
  return interactions;
};

export const addInteractionController = async (responses) => {
  const interaction = await createInteraction(responses);
  return interaction;
};
