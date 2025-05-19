import { z } from "zod";

export const createIndustryValidator = z.object({
  name: z
    .string({ required_error: "Industry name is required" })
    .min(2, "Industry name must be at least 2 characters")
    .max(100, "Industry name must not exceed 100 characters"),
  visibility: z.boolean().default(true),
});

export const updateIndustryValidator = createIndustryValidator.partial();
