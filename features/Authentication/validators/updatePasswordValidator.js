import { z } from "zod";

export const updatePasswordValidator = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters").max(40, "Password can't exceed 40 characters"),
});
