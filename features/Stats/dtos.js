export const statisticsDto = (statistics) => {
  return {
    totalIndustries: statistics.totalIndustries,
    addedIndustriesLastMonth: statistics.addedIndustriesLastMonth,
    totalEquipment: statistics.totalEquipment,
    addedEquipmentLastMonth: statistics.addedEquipmentLastMonth,
    totalQuestions: statistics.totalQuestions,
    addedQuestionsLastMonth: statistics.addedQuestionsLastMonth,
    totalActiveChats: statistics.totalActiveChats,
    activeChatsSinceYesterday: statistics.activeChatsSinceYesterday,
  };
};

export const industryInteractionStatsDto = (interactions) => {
  const labels = interactions.map(interaction => interaction.name);
  const values = interactions.map(interaction => interaction.count);
  return {
    labels,
    values,
  };
};

export const equipmentInteractionStatsDto = (interactions) => {
  const labels = interactions.map(interaction => interaction.name);
  const values = interactions.map(interaction => interaction.count);
  return {
    labels,
    values,
  };
};

export const interactionStatsDto = (interactionStats) => {
  const industryData = {
    overall: industryInteractionStatsDto(interactionStats.overallIndustryInteractions),
    lastWeek: industryInteractionStatsDto(interactionStats.last7DaysIndustryInteractions),
  };

  const equipmentData = {
    overall: equipmentInteractionStatsDto(interactionStats.overallEquipmentInteractions),
    lastWeek: equipmentInteractionStatsDto(interactionStats.last7DaysEquipmentInteractions),
  };

  return {
    industryData,
    equipmentData,
  };
}; 