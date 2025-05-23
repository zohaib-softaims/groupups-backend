import express from "express";
import { getLLMInteractionsController } from "./controllers.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";
const router = express.Router();

router.get("/interactions", authMiddleware, authorizeMiddleware("admin"), getLLMInteractionsController);

export default router;
