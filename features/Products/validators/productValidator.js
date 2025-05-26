import { z } from "zod";

export const createProductValidator = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(2, "name must be at least 2 characters")
    .max(100, "name must not exceed 100 characters"),
  description: z.string({ required_error: "description is required" }).min(10, "description must be at least 10 characters"),
  price: z.coerce
    .number({
      required_error: "price is required",
      invalid_type_error: "price must be a number",
    })
    .min(0, "price must be a positive number"),

  why_good_fit_reason: z
    .string({ required_error: "whyGoodFit description is required" })
    .min(10, "whyGoodFit description must be at least 10 characters"),
  equipment_id: z.string({ required_error: "equipment_id is required" }).regex(/^[0-9a-fA-F]{24}$/, "Invalid equipment_id format"),
});

export const updateProductValidator = z.object({
  name: z.string().min(2, "name must be at least 2 characters").max(100, "name must not exceed 100 characters").optional(),
  description: z.string().min(10, "description must be at least 10 characters").optional(),
  price: z.coerce.number().min(0, "price must be a positive number").optional(),
  why_good_fit_reason: z.string().min(10, "whyGoodFit description must be at least 10 characters").optional(),
  equipment_id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid equipment_id format")
    .optional(),
});
