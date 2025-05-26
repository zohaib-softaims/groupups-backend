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