import { catchAsync } from "../../utils/catchAsync.js";
import createError from "http-errors";
import {
  createQuestion,
  findQuestionById,
  findQuestionsByEquipment,
  findAllQuestions,
  findQuestionByIdAndUpdate,
  findQuestionByIdAndDelete,
  findEquipmentById,
  resetEquipmentQuestions,
} from "./services.js";
import { questionDto, questionsDto } from "../../shared/dtos/questionDto.js";

export const createQuestionController = catchAsync(async (req, res, next) => {
  const { equipment_id } = req.body;

  const equipment = await findEquipmentById(equipment_id);
  if (!equipment) {
    return next(createError(404, "Equipment not found"));
  }

  const question = await createQuestion(req.body);

  return res.status(201).json({
    success: true,
    message: "Question created successfully",
    data: questionDto(question),
  });
});

export const getQuestionsController = catchAsync(async (req, res) => {
  const { equipmentId } = req.query;

  const questions = equipmentId ? await findQuestionsByEquipment(equipmentId) : await findAllQuestions();

  return res.status(200).json({
    success: true,
    message: "Questions retrieved successfully",
    data: questionsDto(questions),
  });
});

export const getQuestionByIdController = catchAsync(async (req, res, next) => {
  const question = await findQuestionById(req.params.id);
  if (!question) {
    return next(createError(404, "Question not found"));
  }

  return res.status(200).json({
    success: true,
    message: "Question retrieved successfully",
    data: questionDto(question),
  });
});

export const updateQuestionController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { question_type, ...updateData } = req.body;

  const existingQuestion = await findQuestionById(id);
  if (!existingQuestion) {
    return next(createError(404, "Question not found"));
  }

  if (question_type && question_type !== existingQuestion.question_type) {
    return next(createError(400, "Question type cannot be changed after creation"));
  }

  const question = await findQuestionByIdAndUpdate(id, updateData);

  return res.status(200).json({
    success: true,
    message: "Question updated successfully",
    data: questionDto(question),
  });
});

export const deleteQuestionController = catchAsync(async (req, res, next) => {
  const question = await findQuestionByIdAndDelete(req.params.id);
  if (!question) {
    return next(createError(404, "Question not found"));
  }

  return res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
});

export const resetQuestionsController = catchAsync(async (req, res, next) => {
  const { equipment_id, questions } = req.body;

  await resetEquipmentQuestions(equipment_id, questions);

  return res.status(200).json({
    success: true,
    message: "questions ordered successfully",
  });
});
