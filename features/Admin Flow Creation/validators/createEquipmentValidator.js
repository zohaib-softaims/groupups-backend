import { z } from "zod";

export const createEquipmentValidator = z.object({
  name: z
    .string({ required_error: "name is required", invalid_type_error: "name must be a string" })
    .min(3, { message: "name must contain atleast 3 characters" }),
});
