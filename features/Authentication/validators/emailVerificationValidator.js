import { z } from "zod";

export const emailVerificationValidator = z.object({
  email: z.string({ required_error: "email is required" }).email({ message: "Invalid email" }),
  token: z.string({ required_error: "verification_token is required" }).min(6, "verification_token must be at least 6 characters"),
});
