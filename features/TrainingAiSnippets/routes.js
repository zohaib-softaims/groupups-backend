import express from "express";
import { createSnippet, updateSnippet, deleteSnippet, getSnippetsByEquipment, resetSnippets } from "./controllers.js";
import { createTrainingAiSnippetValidator, updateTrainingAiSnippetValidator } from "./validators/trainingAiSnippetValidator.js";
import { validate } from "../../middlewares/validate.js";

const router = express.Router();

router.post("/create-snippet", validate(createTrainingAiSnippetValidator), createSnippet);

router.patch("/snippet/:id", validate(updateTrainingAiSnippetValidator), updateSnippet);

router.delete("/snippet/:id", deleteSnippet);

router.get("/snippets/:equipment_id", getSnippetsByEquipment);

router.post("/reset-snippets", resetSnippets);

export default router;
