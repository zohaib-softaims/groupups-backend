import express from "express";
const router = express.Router();

import {
  createIndustryController,
  updateIndustryController,
  deleteIndustryController,
  getAdminIndustriesController,
  getVisibleIndustriesController,
  createEquipmentController,
  updateEquipmentController,
  deleteEquipmentController,
  getAdminEquipmentsController,
  getVisibleEquipmentsController,
  isEquipmentExistController,
  reorderIndustriesController,
  reorderEquipmentsController,
  getEquipmentEndingMessageAndToneController,
} from "./controllers.js";

import {
  createIndustryValidator,
  updateIndustryValidator,
} from "./validators/industryValidator.js";
import {
  createEquipmentValidator,
  updateEquipmentValidator,
} from "./validators/equipmentValidator.js";

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
router.patch(
  "/industries/:id",
  authMiddleware,
  authorizeMiddleware("admin"),
  upload.single("industry_image"),
  validateIndustryImage("update"),
  validate(updateIndustryValidator),
  updateIndustryController
);
router.delete(
  "/industries/:id",
  authMiddleware,
  authorizeMiddleware("admin"),
  deleteIndustryController
);
router.get(
  "/admin/industries",
  authMiddleware,
  authorizeMiddleware("admin"),
  getAdminIndustriesController
);
router.get("/industries", getVisibleIndustriesController);
router.post(
  "/reorder-industries",
  authMiddleware,
  authorizeMiddleware("admin"),
  reorderIndustriesController
);

// Equipment Routes
router.post(
  "/create-equipment",
  authMiddleware,
  authorizeMiddleware("admin"),
  validate(createEquipmentValidator),
  createEquipmentController
);
router.patch(
  "/equipments/:id",
  authMiddleware,
  authorizeMiddleware("admin"),
  validate(updateEquipmentValidator),
  updateEquipmentController
);
router.delete(
  "/equipments/:id",
  authMiddleware,
  authorizeMiddleware("admin"),
  deleteEquipmentController
);
router.get(
  "/admin/equipments",
  authMiddleware,
  authorizeMiddleware("admin"),
  getAdminEquipmentsController
);
router.get("/equipments", getVisibleEquipmentsController);
router.get("/check-equipment", isEquipmentExistController);
router.post(
  "/reorder-equipments",
  authMiddleware,
  authorizeMiddleware("admin"),
  reorderEquipmentsController
);
router.get(
  "/equipments/:id/ending-message-tone",
  getEquipmentEndingMessageAndToneController
);

export default router;