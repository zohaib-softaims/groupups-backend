import express from "express";
import { getStatisticsController } from "./controllers.js";
import { getInteractionStatsController } from "./controllers.js";

const router = express.Router();

router.get("/counts", getStatisticsController);
router.get("/interactions", getInteractionStatsController);

export default router;
