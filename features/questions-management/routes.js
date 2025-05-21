import express from "express";
const router = express.Router();

import {
  createQuestionController,
  getQuestionsController,
  getQuestionByIdController,
  updateQuestionController,
  deleteQuestionController,
  resetQuestionsController,
} from "./controllers.js";

import { createQuestionValidator, updateQuestionValidator, resetQuestionsValidator } from "./validators/questionValidator.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";
import { validate } from "../../middlewares/validate.js";

router.post("/create-question", authMiddleware, authorizeMiddleware("admin"), createQuestionValidator, createQuestionController);

router.get("/questions", authMiddleware, authorizeMiddleware("admin"), getQuestionsController);

router.get("/question/:id", authMiddleware, authorizeMiddleware("admin"), getQuestionByIdController);

router.patch("/question/:id", authMiddleware, authorizeMiddleware("admin"), updateQuestionValidator, updateQuestionController);

router.delete("/question/:id", authMiddleware, authorizeMiddleware("admin"), deleteQuestionController);

router.post("/reset-questions", authMiddleware, authorizeMiddleware("admin"), validate(resetQuestionsValidator), resetQuestionsController);

export default router;
