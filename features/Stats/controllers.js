import { catchAsync } from "../../utils/catchAsync.js";
import { getStatistics } from "./services.js";
import { getInteractionStats } from "./services.js";
import { statisticsDto, interactionStatsDto } from "./dtos.js";

export const getStatisticsController = catchAsync(async (req, res) => {
  const statistics = await getStatistics();

  res.status(200).json({
    success: true,
    message: 'Statistics fetched successfully.',
    data: statisticsDto(statistics),
  });
});

export const getInteractionStatsController = catchAsync(async (req, res) => {
  const interactionStats = await getInteractionStats();

  res.status(200).json({
    success: true,
    message: 'Interaction statistics fetched successfully.',
    data: interactionStatsDto(interactionStats),
  });
}); 