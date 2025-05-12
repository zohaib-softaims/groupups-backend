export const userDto = (user) => {
  return {
    id: user._id,
    email: user.email,
    role: user.role,
    verifyEmail: user.verifyEmail,
  };
};
