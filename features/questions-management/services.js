import { Question } from "../../shared/models/QuestionModel.js";
import { Equipment } from "../../shared/models/EquipmentModel.js";

export const createQuestion = async (questionData) => {
  const question = new Question(questionData);
  return await question.save();
};

export const findQuestionById = async (id) => {
  return await Question.findById(id);
};

export const findQuestionsByEquipment = async (equipmentId) => {
  const equipment = await Equipment.findById(equipmentId).select("questions").populate({
    path: "questions",
  });

  return equipment?.questions || [];
};

export const findAllQuestions = async () => {
  return await Question.find().sort({ createdAt: -1 });
};

export const findQuestionByIdAndUpdate = async (id, updateData) => {
  return await Question.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const findQuestionByIdAndDelete = async (id) => {
  return await Question.findByIdAndDelete(id);
};

export const findEquipmentById = async (id) => {
  return await Equipment.findById(id);
};

export const resetEquipmentQuestions = async (equipmentId, questionIds) => {
  const equipment = await Equipment.findById(equipmentId);
  if (!equipment) {
    throw new Error(404, "Equipment not found");
  }
  const questions = await Question.find({ _id: { $in: questionIds } });
  if (questions.length !== questionIds.length) {
    throw new Error(400, "One or more question IDs are invalid");
  }
  equipment.questions = questionIds;
  await equipment.save();

  return questions;
};
