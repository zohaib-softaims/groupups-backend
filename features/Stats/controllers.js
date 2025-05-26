import { catchAsync } from "../../utils/catchAsync.js";
import { getStatistics } from "./services.js";
import { statisticsDto } from "./dtos.js";

export const getStatisticsController = catchAsync(async (req, res) => {
  const statistics = await getStatistics();

  res.status(200).json({
    success: true,
    message: 'Statistics fetched successfully.',
    data: statisticsDto(statistics),
  });
}); 