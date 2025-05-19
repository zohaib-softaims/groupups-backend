import express from "express";
const router = express.Router();

import {
  createIndustryController,
  getIndustriesController,
  getIndustryByIdController,
  updateIndustryController,
  deleteIndustryController,
  createEquipmentController,
  getEquipmentsController,
  getEquipmentByIdController,
  updateEquipmentController,
  deleteEquipmentController,
} from "./controllers.js";

import { createIndustryValidator, updateIndustryValidator } from "./validators/industryValidator.js";
import { createEquipmentValidator, updateEquipmentValidator } from "./validators/equipmentValidator.js";

import { validate } from "../../middlewares/validate.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";
import { upload } from "../../utils/multer.js";
import { validateIndustryImage } from "./validators/validateIndustryImage.js";

// Industry Routes
router.post(
  "/create-industry",
  authMiddleware,
  authorizeMiddleware("admin"),
  upload.single("industry_image"),
  validateIndustryImage,
  validate(createIndustryValidator),
  createIndustryController
);
router.get("/industries", authMiddleware, authorizeMiddleware("admin"), getIndustriesController);
router.get("/industries/:id", authMiddleware, authorizeMiddleware("admin"), getIndustryByIdController);
router.patch("/industries/:id", authMiddleware, authorizeMiddleware("admin"), validate(updateIndustryValidator), updateIndustryController);
router.delete("/industries/:id", authMiddleware, authorizeMiddleware("admin"), deleteIndustryController);

// Equipment Routes
router.post(
  "/create-equipment",
  authMiddleware,
  authorizeMiddleware("admin"),
  validate(createEquipmentValidator),
  createEquipmentController
);
router.get("/equipments", authMiddleware, authorizeMiddleware("admin"), getEquipmentsController);
router.get("/equipments/:id", authMiddleware, authorizeMiddleware("admin"), getEquipmentByIdController);
router.patch(
  "/equipments/:id",
  authMiddleware,
  authorizeMiddleware("admin"),
  validate(updateEquipmentValidator),
  updateEquipmentController
);

router.delete("/equipments/:id", authMiddleware, authorizeMiddleware("admin"), deleteEquipmentController);

export default router;
