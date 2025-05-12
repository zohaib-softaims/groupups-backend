import { z } from "zod";

export const emailValidator = z.object({
  email: z.string({ required_error: "email is required" }).email({ message: "Invalid email" }),
});
