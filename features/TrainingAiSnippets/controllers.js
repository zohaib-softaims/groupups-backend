import { catchAsync } from "../../utils/catchAsync.js";
import createError from "http-errors";
import { createTrainingAiSnippet, updateTrainingAiSnippet, deleteTrainingAiSnippet, getTrainingAiSnippetsByEquipment, resetEquipmentSnippets } from "./services.js";
import { trainingAiSnippetDto, trainingAiSnippetsDto } from "./dtos.js";
import { findEquipmentById } from "../IndustryEquipment/services.js";

export const createSnippet = catchAsync(async (req, res, next) => {
  const { equipment_id, snippet_text } = req.body;

  const equipment = await findEquipmentById(equipment_id);
  if (!equipment) {
    return next(createError(404, "Equipment not found"));
  }

  const snippet = await createTrainingAiSnippet({ equipment_id, snippet_text });

  return res.status(201).json({
    success: true,
    message: "Training AI snippet created successfully",
    data: trainingAiSnippetDto(snippet),
  });
});

export const updateSnippet = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { snippet_text } = req.body;
  console.log("text", snippet_text);
  const snippet = await updateTrainingAiSnippet(id, { snippet_text });
  if (!snippet) {
    return next(createError(404, "Training AI snippet not found"));
  }

  return res.status(200).json({
    success: true,
    message: "Training AI snippet updated successfully",
    data: trainingAiSnippetDto(snippet),
  });
});

export const deleteSnippet = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const snippet = await deleteTrainingAiSnippet(id);
  if (!snippet) {
    return next(createError(404, "Training AI snippet not found"));
  }

  return res.status(200).json({
    success: true,
    message: "Training AI snippet deleted successfully",
  });
});

export const getSnippetsByEquipment = catchAsync(async (req, res, next) => {
  const { equipment_id } = req.params;

  const equipment = await findEquipmentById(equipment_id);
  if (!equipment) {
    return next(createError(404, "Equipment not found"));
  }

  const snippets = await getTrainingAiSnippetsByEquipment(equipment_id);

  return res.status(200).json({
    success: true,
    message: `Training AI snippets for equipment ${equipment_id} fetched successfully`,
    data: trainingAiSnippetsDto(snippets),
  });
});

export const resetSnippets = catchAsync(async (req, res, next) => {
    const { equipment_id, snippets } = req.body;

    const equipment = await findEquipmentById(equipment_id);
    if (!equipment) {
        return next(createError(404, "Equipment not found"));
    }

    await resetEquipmentSnippets(equipment_id, snippets);

    return res.status(200).json({
        success: true,
        message: "Training AI snippets reset successfully"
    });
});
