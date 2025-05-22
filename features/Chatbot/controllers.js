import { findQuestionsByEquipment } from "./services.js";

export const getLLMQuestionsController = async (equipmentId) => {
  const questions = equipmentId ? await findQuestionsByEquipment(equipmentId) : await findAllQuestions();
  return questions || [];
};
