import { User } from "../../shared/models/UserModel.js";
import { BlacklistedToken } from "../../shared/models/BlacklistedTokenModel.js";

export const updateUserEmailVerificationStatus = async (userId) => {
  return User.findByIdAndUpdate(
    userId,
    {
      verifyEmail: true,
      verificationToken: null,
      verificationTokenExpiry: null,
    },
    { new: true }
  );
};

export const createBlacklistedToken = async (token, expiresAt) => {
  const newToken = new BlacklistedToken({ token, expiresAt });
  return await newToken.save();
};
