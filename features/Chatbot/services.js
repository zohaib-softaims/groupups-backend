import { Equipment } from "../../shared/models/EquipmentModel.js";

export const findQuestionsByEquipment = async (equipmentId) => {
  return await Equipment.findById(equipmentId).populate({
    path: "questions",
    select: "_id question_text question_type required options allowMultipleSelection",
  });
};
