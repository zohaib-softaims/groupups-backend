import { z } from "zod";

export const createEquipmentValidator = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(2, "name must be at least 2 characters")
    .max(100, "name must not exceed 100 characters"),
  visibility: z.boolean().default(true),
  industry_id: z.string({ required_error: "industry_id is required" }).regex(/^[0-9a-fA-F]{24}$/, "Invalid industry_id format"),
});

export const updateEquipmentValidator = createEquipmentValidator.partial();
