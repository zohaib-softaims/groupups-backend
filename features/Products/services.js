import { Product } from "../../shared/models/ProductModel.js";

export const createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

export const findProductById = async (productId) => {
  return await Product.findById(productId);
};

export const findProductsByEquipmentId = async (equipmentId) => {
  return await Product.find({ equipment_id: equipmentId }).sort({ createdAt: -1 });
};

export const findProductByIdAndUpdate = async (productId, updateData) => {
  return await Product.findByIdAndUpdate(productId, updateData, { new: true });
};

export const findProductByIdAndDelete = async (productId) => {
  return await Product.findByIdAndDelete(productId);
}; 