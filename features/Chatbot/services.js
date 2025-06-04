import { Equipment } from "../../shared/models/EquipmentModel.js";
import { Interaction } from "../../shared/models/InteractionModel.js";

export const findQuestionsByEquipment = async (equipmentId) => {
  return await Equipment.findById(equipmentId).populate([
    {
      path: "questions",
      select: "_id question_text question_type required options allowMultipleSelection context",
    },
    {
      path: "industry_id",
    },
    {
      path: "trainingAiSnippets",
      select: "snippet_text",
    },
  ]);
};

export const createInteraction = async (interaction) => {
  const response = await Interaction.create(interaction);
  return response;
};

export const findAllInteractions = async (page, limit, equipment_id, user_email) => {
  const skip = (page - 1) * limit;
  const query = {};

  if (equipment_id) {
    query["equipment_id"] = equipment_id;
  }

  if (user_email) {
    query["user_email"] = { $regex: user_email, $options: "i" };
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
