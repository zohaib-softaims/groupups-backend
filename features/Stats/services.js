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

export const getInteractionStats = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [overallIndustryInteractions, last7DaysIndustryInteractions, overallEquipmentInteractions, last7DaysEquipmentInteractions] = await Promise.all([
    // Aggregate overall industry interactions
    Industry.aggregate([
      { $lookup: { from: "interactions", localField: "_id", foreignField: "industry_id", as: "interactions" } },
      { $unwind: { path: "$interactions", preserveNullAndEmptyArrays: true } },
      { $group: { _id: "$_id", name: { $first: "$name" }, count: { $sum: { $cond: ["$interactions", 1, 0] } } } },
      { $project: { _id: 0, name: 1, count: 1 } },
      { $sort: { name: 1 } },
    ]),

    // Aggregate last 7 days industry interactions
    Industry.aggregate([
      { $lookup: { from: "interactions", localField: "_id", foreignField: "industry_id", as: "interactions" } },
      { $unwind: { path: "$interactions", preserveNullAndEmptyArrays: true } },
      { $match: { $or: [ { "interactions.createdAt": { $gte: sevenDaysAgo } }, { interactions: { $exists: false } } ] } },
      { $group: { _id: "$_id", name: { $first: "$name" }, count: { $sum: { $cond: ["$interactions.createdAt", 1, 0] } } } },
      { $project: { _id: 0, name: 1, count: 1 } },
      { $sort: { name: 1 } },
    ]),

    // Aggregate overall equipment interactions
    Equipment.aggregate([
      { $lookup: { from: "interactions", localField: "_id", foreignField: "equipment_id", as: "interactions" } },
      { $unwind: { path: "$interactions", preserveNullAndEmptyArrays: true } },
      { $group: { _id: "$_id", name: { $first: "$name" }, count: { $sum: { $cond: ["$interactions", 1, 0] } } } },
      { $project: { _id: 0, name: 1, count: 1 } },
      { $sort: { name: 1 } },
    ]),

    // Aggregate last 7 days equipment interactions
    Equipment.aggregate([
      { $lookup: { from: "interactions", localField: "_id", foreignField: "equipment_id", as: "interactions" } },
      { $unwind: { path: "$interactions", preserveNullAndEmptyArrays: true } },
      { $match: { $or: [ { "interactions.createdAt": { $gte: sevenDaysAgo } }, { interactions: { $exists: false } } ] } },
      { $group: { _id: "$_id", name: { $first: "$name" }, count: { $sum: { $cond: ["$interactions.createdAt", 1, 0] } } } },
      { $project: { _id: 0, name: 1, count: 1 } },
      { $sort: { name: 1 } },
    ]),
  ]);

  return {
    overallIndustryInteractions,
    last7DaysIndustryInteractions,
    overallEquipmentInteractions,
    last7DaysEquipmentInteractions,
  };
}; 