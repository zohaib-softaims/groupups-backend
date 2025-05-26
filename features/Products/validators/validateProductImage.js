import createError from "http-errors";

export const validateProductImage = (type) => (req, res, next) => {
  if (type === "add") {
    if (!req.file) {
      return next(createError(400, "Product image is required"));
    }
  }
  if (req.file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return next(createError(400, "Invalid image format. Only JPEG, PNG, and JPG are allowed."));
    }
  }

  next();
};
