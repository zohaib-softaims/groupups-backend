import { catchAsync } from "../../utils/catchAsync.js";
import createError from "http-errors";
import { s3Uploader } from "../../utils/s3Uploader.js";
import {
  createProduct,
  findProductById,
  findProductsByEquipmentId,
  findProductByIdAndUpdate,
  findProductByIdAndDelete,
} from "./services.js";
import { productDto, productsDto } from "./dtos.js";
import { findEquipmentById } from "../IndustryEquipment/services.js";

export const createProductController = catchAsync(async (req, res, next) => {
  const { name, description, price, why_good_fit_reason, equipment_id } = req.body;
  const imageFile = req.file;
  if (!imageFile) {
    return next(createError(400, "Product image is required"));
  }
  const equipment = await findEquipmentById(equipment_id);
  if (!equipment) {
    return next(createError(404, "Equipment not found"));
  }
  const uploadResult = await s3Uploader(imageFile);
  if (!uploadResult.success) {
    return next(createError(500, `Error uploading product image: ${uploadResult.error}`));
  }
  const productData = {
    name,
    description,
    image: uploadResult.url,
    price,
    why_good_fit_reason,
    equipment_id,
  };
  const product = await createProduct(productData);

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: productDto(product),
  });
});

export const getProductsByEquipmentController = catchAsync(async (req, res, next) => {
  const { equipmentId } = req.params;
  const equipment = await findEquipmentById(equipmentId);
  if (!equipment) {
    return next(createError(404, "Equipment not found"));
  }

  const products = await findProductsByEquipmentId(equipmentId);

  return res.status(200).json({
    success: true,
    message: `Products for equipment ${equipmentId} fetched successfully`,
    data: productsDto(products),
  });
});

export const updateProductController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  const imageFile = req.file;

  const product = await findProductById(id);
  if (!product) {
    return next(createError(404, "Product not found"));
  }
  if (updateData.equipment_id) {
    const equipment = await findEquipmentById(updateData.equipment_id);
    if (!equipment) {
      return next(createError(404, "Equipment not found"));
    }
  }

  if (imageFile) {
    const uploadResult = await s3Uploader(imageFile);
    if (!uploadResult.success) {
      return next(createError(500, `Error uploading product image: ${uploadResult.error}`));
    }
    updateData.image = uploadResult.url;
  }

  const updatedProduct = await findProductByIdAndUpdate(id, updateData);

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: productDto(updatedProduct),
  });
});

export const deleteProductController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await findProductById(id);

  if (!product) {
    return next(createError(404, "Product not found"));
  }
  await findProductByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
