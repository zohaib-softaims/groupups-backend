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

export const findAllInteractions = async (page, limit, industry_name, user_email) => {
  const skip = (page - 1) * limit;
  const query = {};

  if (industry_name) {
    query["industry_snapshot.name"] = industry_name;
  }

  if (user_email) {
    query["created_by.email"] = { $regex: user_email, $options: "i" };
  }

  const interactions = await Interaction.find(query)
    .select("user_name user_email equipment_snapshot.name createdAt")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  console.log("interactions", interactions);
  const total = await Interaction.countDocuments(query);

  return { interactions, total };
};

export const findInteractionById = async (interactionId) => {
  const interaction = await Interaction.findById(interactionId);

  return interaction;
};
