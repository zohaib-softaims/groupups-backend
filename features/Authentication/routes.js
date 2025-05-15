import express from "express";
const router = express.Router();

import { verifyEmail, resendVerificationEmail, loginUser, forgotPassword, resetPassword, logoutUser, updateEmail } from "./controllers.js";
import { validate } from "../../middlewares/validate.js";
import { emailVerificationValidator } from "./validators/emailVerificationValidator.js";
import { loginValidator } from "./validators/loginValidator.js";
import { resetPasswordValidator } from "./validators/resetPasswordValidator.js";
import { emailValidator } from "./validators/emailValidator.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";
import { getMe } from "./controllers.js";

router.patch("/update-email", authMiddleware, authorizeMiddleware("admin"), validate(emailValidator), updateEmail);
router.post("/verify-email", validate(emailVerificationValidator), verifyEmail);
router.post("/resend-verification-email", validate(emailValidator), resendVerificationEmail);
router.post("/login", validate(loginValidator), loginUser);
router.post("/forgot-password", validate(emailValidator), forgotPassword);
router.post("/reset-password", validate(resetPasswordValidator), resetPassword);
router.get("/get-me", authMiddleware, getMe);
router.post("/logout", logoutUser);

export default router;
