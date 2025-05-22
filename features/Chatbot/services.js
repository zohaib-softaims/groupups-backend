import { Equipment } from "../../shared/models/EquipmentModel.js";
import { Interaction } from "../../shared/models/InteractionModel.js";

export const findQuestionsByEquipment = async (equipmentId) => {
  return await Equipment.findById(equipmentId).populate({
    path: "questions",
    select: "_id question_text question_type required options allowMultipleSelection",
  });
};

export const createInteraction = async (responses) => {
  const interaction = await Interaction.create({ responses });
  return interaction;
};

export const findAllInteractions = async () => {
  return await Interaction.find().populate("question_id").sort({ created_at: -1 });
};
