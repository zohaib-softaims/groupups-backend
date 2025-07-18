import { z } from "zod";
import { validate } from "../../../middlewares/validate.js";

// Helper to parse JSON fields from multipart/form-data
const parseJsonField = (val, fallback) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return fallback;
    }
  }
  return val !== undefined ? val : fallback;
};

const getFirstString = (val) => (Array.isArray(val) ? val[0] : val);

const baseQuestionSchema = z.object({
  equipment_id: z
    .any()
    .transform(getFirstString)
    .refine((val) => typeof val === "string" && val.length === 24, {
      message: "Equipment ID must be a valid 24-character valid id",
    }),

  question_type: z.enum(
    ["open_ended", "multiple_choice", "statement", "file_upload"],
    {
      required_error: "Question type is required",
      invalid_type_error:
        "Question type must be one of: open_ended, multiple_choice, statement, file_upload",
    }
  ),

  required: z
    .any()
    .transform((val) => {
      if (typeof val === "boolean") return val;
      if (typeof val === "string") return val === "true";
      return Boolean(val);
    })
    .refine((val) => typeof val === "boolean", {
      message: "Required field must be true or false",
    })
    .default(true),

  youtube_link: z
    .string({
      invalid_type_error: "YouTube link must be a string",
    })
    .url("You must provide a valid YouTube URL")
    .optional()
    .or(z.literal("")),

  question_text: z
    .string({
      required_error: "Question text is required",
    })
    .trim()
    .min(1, {
      message: "Question text cannot be empty",
    }),

  context: z
    .any()
    .transform((val) => {
      if (Array.isArray(val)) return val;
      return parseJsonField(val, []);
    })
    .refine((val) => Array.isArray(val), {
      message: "Context must be an array",
    })
    .optional()
    .default([]),
});

const simpleQuestionSchema = baseQuestionSchema.extend({
  question_type: z.enum(["open_ended", "statement", "file_upload"]),
});

const multipleChoiceSchema = baseQuestionSchema.extend({
  question_type: z.literal("multiple_choice"),

  options: z
    .any()
    .transform((val) => {
      if (Array.isArray(val)) return val;
      return parseJsonField(val, []);
    })
    .refine((val) => Array.isArray(val), {
      message: "Options must be an array",
    })
    .refine((val) => val.length >= 2, {
      message: "Multiple choice questions must have at least 2 options",
    })
    .refine(
      (val) =>
        val.every(
          (opt) => typeof opt.text === "string" && opt.text.trim().length > 0
        ),
      { message: "Each option must have non-empty text" }
    ),

  allowMultipleSelection: z
    .any()
    .transform((val) => {
      if (typeof val === "boolean") return val;
      if (typeof val === "string") return val === "true";
      return Boolean(val);
    })
    .refine((val) => typeof val === "boolean", {
      message: "allowMultipleSelection must be a boolean",
    }),
});

export const createQuestionValidator = (req, res, next) => {
  const { question_type } = req.body;
  const schema =
    question_type === "multiple_choice"
      ? multipleChoiceSchema
      : simpleQuestionSchema;

  return validate(schema)(req, res, next);
};

export const updateQuestionValidator = (req, res, next) => {
  const { question_type } = req.body;
  const schema =
    question_type === "multiple_choice"
      ? multipleChoiceSchema.partial()
      : simpleQuestionSchema.partial();

  return validate(schema)(req, res, next);
};

export const resetQuestionsValidator = z.object({
  equipment_id: z
    .string({
      required_error: "equipment_id is required",
    })
    .length(24, {
      message: "equipment_id must be a valid id",
    }),
  questions: z.array(z.string().length(24, "Each question must be a valid id")),
});
