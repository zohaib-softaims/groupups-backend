import { User } from "./models/UserModel.js";
import { BlacklistedToken } from "./models/BlacklistedTokenModel.js";

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const updateUserById = async (id, update) => {
  return await User.findByIdAndUpdate(id, update, { new: true });
};

export const isTokenBlacklisted = async (token) => {
  const blacklisted = await BlacklistedToken.findOne({ token });
  return !!blacklisted;
};
