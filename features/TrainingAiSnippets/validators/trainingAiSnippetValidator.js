import { z } from "zod";

export const createTrainingAiSnippetValidator = z.object({
  equipment_id: z.string({ required_error: "equipment_id is required" }).regex(/^[0-9a-fA-F]{24}$/, "Invalid equipment_id format"),
  snippet_text: z
    .string({ required_error: "snippet_text is required" })
    .min(1, "snippet_yext must not be empty")
    .max(10000, "snippet_text must not exceed 10000 characters"),
});

export const updateTrainingAiSnippetValidator = z.object({
  snippet_text: z
    .string({ required_error: "snippet_text is required" })
    .min(1, "snippet_text must not be empty")
    .max(10000, "snippet_text must not exceed 10000 characters"),
});
