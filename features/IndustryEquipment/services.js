import { Industry } from "../../shared/models/IndustryModel.js";
import { Equipment } from "../../shared/models/EquipmentModel.js";

// Industry Services
export const createIndustry = async (industryData) => {
  const industry = new Industry(industryData);
  return await industry.save();
};

export const findIndustryByIdAndUpdate = async (id, updateData) => {
  return await Industry.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const findIndustryByIdAndDelete = async (id) => {
  return await Industry.findByIdAndDelete(id);
};

export const findIndustryByName = async (name) => {
  const trimmedName = name.trim();

  return await Industry.findOne({
    name: {
      $regex: `^${trimmedName}$`,
      $options: "i",
    },
  });
};

export const findIndustryById = async (id) => {
  return await Industry.findById(id);
};

export const findAllIndustries = async (query = {}) => {
  return await Industry.find(query).sort({ createdAt: -1 });
};

export const findVisibleIndustries = async () => {
  return await Industry.find({ visibility: true }).sort({ createdAt: -1 });
};

export const countEquipmentsByIndustry = async (industryId) => {
  return await Equipment.countDocuments({ industry: industryId });
};

// Equipment Services
export const createEquipment = async (equipmentData) => {
  const equipment = new Equipment(equipmentData);
  return await equipment.save();
};
export const findEquipmentByIdAndUpdate = async (id, updateData) => {
  return await Equipment.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const findEquipmentByIdAndDelete = async (id) => {
  return await Equipment.findByIdAndDelete(id);
};

export const findEquipmentByName = async (name) => {
  const trimmedName = name.trim();

  return await Equipment.findOne({
    name: {
      $regex: `^${trimmedName}$`,
      $options: "i",
    },
  });
};

export const findEquipmentById = async (id) => {
  return await Equipment.findById(id);
};

export const findAllEquipments = async () => {
  return await Equipment.find().sort({ createdAt: -1 });
};

export const findVisibleEquipments = async (industryId = null) => {
  const query = { visibility: true };
  if (industryId) {
    query.industry_id = industryId;
  }

  return await Equipment.find(query).sort({ createdAt: -1 });
};
