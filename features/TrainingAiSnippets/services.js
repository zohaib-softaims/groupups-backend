import { TrainingAiSnippet } from "../../shared/models/TrainingAiSnippetModel.js";
import { Equipment } from "../../shared/models/EquipmentModel.js";

const createTrainingAiSnippet = async (data) => {
  const snippet = new TrainingAiSnippet(data);
  return await snippet.save();
};

const updateTrainingAiSnippet = async (id, data) => {
  return await TrainingAiSnippet.findByIdAndUpdate(id, data, { new: true });
};

const deleteTrainingAiSnippet = async (id) => {
  return await TrainingAiSnippet.findByIdAndDelete(id);
};

const getTrainingAiSnippetsByEquipment = async (equipmentId) => {
  const equipment = await Equipment.findById(equipmentId).select("trainingAiSnippets").populate({
    path: "trainingAiSnippets",
  });
  return equipment?.trainingAiSnippets || [];
};

const resetEquipmentSnippets = async (equipment_id, snippetIds) => {
  const equipment = await Equipment.findById(equipment_id);
  if (!equipment) {
    throw new Error("Equipment not found");
  }

  // Verify all snippet IDs exist
  const snippets = await TrainingAiSnippet.find({ _id: { $in: snippetIds } });
  if (snippets.length !== snippetIds.length) {
    throw new Error("One or more snippet IDs are invalid");
  }
  equipment.trainingAiSnippets = snippetIds;
  await equipment.save();

  return snippets;
};

export {
  createTrainingAiSnippet,
  updateTrainingAiSnippet,
  deleteTrainingAiSnippet,
  getTrainingAiSnippetsByEquipment,
  resetEquipmentSnippets,
};
