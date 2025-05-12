import { z } from "zod";

export const loginValidator = z.object({
  email: z.string({ required_error: "email is required" }).email({ message: "Invalid email" }),
  password: z.string({ required_error: "password is required" }).min(6, "Password must be at least 6 characters"),
});
