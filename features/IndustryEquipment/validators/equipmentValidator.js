import { z } from "zod";

export const createEquipmentValidator = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(2, "Equipment name must be at least 2 characters")
    .max(50, "Equipment name must not exceed 50 characters"),
  visibility: z.boolean().default(true),
  productsVisibility: z.boolean().default(true),
  maxProducts: z.number().int().min(3, "Max Products must be atleast 3").optional(),
  industry_id: z
    .string({ required_error: "industry_id is required" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid industry_id format"),
});

export const updateEquipmentValidator = createEquipmentValidator.partial();
