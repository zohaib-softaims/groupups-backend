import { Equipment } from "../../shared/models/EquipmentModel.js";
import { Interaction } from "../../shared/models/InteractionModel.js";

export const findQuestionsByEquipment = async (equipmentId) => {
  return await Equipment.findById(equipmentId).populate([
    {
      path: "questions",
      select: "_id question_text question_type required options allowMultipleSelection",
    },
    {
      path: "industry_id",
    },
  ]);
};

export const createInteraction = async (interaction) => {
  const response = await Interaction.create(interaction);
  return response;
};

export const findAllInteractions = async () => {
  return await Interaction.find().populate("question_id").sort({ created_at: -1 });
};
