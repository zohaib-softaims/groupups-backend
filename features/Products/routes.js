import express from "express";
const router = express.Router();

import {
  createProductController,
  getProductsByEquipmentController,
  updateProductController,
  deleteProductController,
} from "../Products/controllers.js";

import { createProductValidator, updateProductValidator } from "./validators/productValidator.js";
import { validateProductImage } from "./validators/validateProductImage.js";

import { validate } from "../../middlewares/validate.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";
import { upload } from "../../utils/multer.js";

router.post(
  "/create-product",
  authMiddleware,
  authorizeMiddleware("admin"),
  upload.single("image"),
  validateProductImage("add"),
  validate(createProductValidator),
  createProductController
);

router.get("/get-by-equipment/:equipmentId", getProductsByEquipmentController);

router.put(
  "/update-product/:id",
  authMiddleware,
  authorizeMiddleware("admin"),
  upload.single("image"),
  validateProductImage("update"),
  validate(updateProductValidator),
  updateProductController
);

router.delete("/delete-product/:id", authMiddleware, authorizeMiddleware("admin"), deleteProductController);

export default router;
