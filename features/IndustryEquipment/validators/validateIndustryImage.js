export const validateIndustryImage =
  (type = "create") =>
  (req, res, next) => {
    const file = req.file;

    if (!file && type == "update") {
      return next();
    }
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const maxSizeInBytes = 2 * 1024 * 1024;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "industry_image field required.",
      });
    }

    const extension = file.originalname.slice(((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();

    if (!allowedExtensions.includes(`.${extension}`)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type! Allowed: jpg, jpeg, png.",
      });
    }

    if (file.size > maxSizeInBytes) {
      return res.status(400).json({
        success: false,
        message: "industry_image must not exceed 2MB.",
      });
    }

    next();
  };
