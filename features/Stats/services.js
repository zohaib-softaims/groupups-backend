import { Industry } from "../../shared/models/IndustryModel.js";
import { Equipment } from "../../shared/models/EquipmentModel.js";
import { Question } from "../../shared/models/QuestionModel.js";
import { Interaction } from "../../shared/models/InteractionModel.js";

export const getStatistics = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [totalIndustries, addedIndustriesLastMonth, totalEquipment, addedEquipmentLastMonth, totalQuestions, addedQuestionsLastMonth, totalActiveChats, activeChatsSinceYesterday] = await Promise.all([
    Industry.countDocuments(),
    Industry.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    Equipment.countDocuments(),
    Equipment.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    Question.countDocuments(),
    Question.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    Interaction.countDocuments(),
    Interaction.countDocuments({ createdAt: { $gte: yesterday } }),
  ]);

  return {
    totalIndustries,
    addedIndustriesLastMonth,
    totalEquipment,
    addedEquipmentLastMonth,
    totalQuestions,
    addedQuestionsLastMonth,
    totalActiveChats,
    activeChatsSinceYesterday,
  };
}; 