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
  return await Question.find({ equipment_id: equipmentId }).sort({ createdAt: -1 });
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
