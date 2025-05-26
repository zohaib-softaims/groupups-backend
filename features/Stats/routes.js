import express from "express";
import { getStatisticsController } from "./controllers.js";

const router = express.Router();

router.get("/counts", getStatisticsController);

export default router;
