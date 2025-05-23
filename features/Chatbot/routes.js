import express from "express";
import { getLLMInteractionsController, getInteractionByIdController } from "./controllers.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";

const router = express.Router();

router.get("/interactions", authMiddleware, authorizeMiddleware("admin"), getLLMInteractionsController);

router.get("/interactions/:id", authMiddleware, authorizeMiddleware("admin"), getInteractionByIdController);

export default router;
