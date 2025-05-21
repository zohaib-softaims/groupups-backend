import express from "express";
const router = express.Router();

import {
  createIndustryController,
  getIndustryByIdController,
  updateIndustryController,
  deleteIndustryController,
  createEquipmentController,
  getAdminEquipmentsController,
  getVisibleEquipmentsController,
  getEquipmentByIdController,
  updateEquipmentController,
  deleteEquipmentController,
  getAdminIndustriesController,
  getVisibleIndustriesController,
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
  validateIndustryImage("add"),
  validate(createIndustryValidator),
  createIndustryController
);
router.get("/admin/industries", authMiddleware, authorizeMiddleware("admin"), getAdminIndustriesController);
router.get("/industries", authMiddleware, getVisibleIndustriesController);
router.get("/industries/:id", authMiddleware, authorizeMiddleware("admin"), getIndustryByIdController);
router.patch(
  "/industries/:id",
  authMiddleware,
  authorizeMiddleware("admin"),
  upload.single("industry_image"),
  validateIndustryImage("update"),
  validate(updateIndustryValidator),
  updateIndustryController
);
router.delete("/industries/:id", authMiddleware, authorizeMiddleware("admin"), deleteIndustryController);

// Equipment Routes
router.post(
  "/create-equipment",
  authMiddleware,
  authorizeMiddleware("admin"),
  validate(createEquipmentValidator),
  createEquipmentController
);

router.get("/admin/equipments", authMiddleware, authorizeMiddleware("admin"), getAdminEquipmentsController);
router.get("/equipments", getVisibleEquipmentsController);

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
