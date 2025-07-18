import { catchAsync } from "../../utils/catchAsync.js";
import createError from "http-errors";
import {
  createIndustry,
  findIndustryByName,
  findIndustryById,
  findIndustryByIdAndUpdate,
  findIndustryByIdAndDelete,
  findAllIndustries,
  countEquipmentsByIndustry,
  createEquipment,
  findEquipmentByName,
  findEquipmentByIdAndUpdate,
  findEquipmentByIdAndDelete,
  findAllEquipments,
  findVisibleIndustries,
  findVisibleEquipments,
  reorderIndustries,
  reorderAllIndustries,
  reorderEquipments,
  reorderAllEquipments,
  countProductsByEquipment,
  findEquipmentById,
} from "./services.js";

import { industryDto, industriesDto } from "../../shared/dtos/industryDto.js";
import { equipmentDto, equipmentsDto } from "../../shared/dtos/equipmentDto.js";
import { s3Uploader, deleteFromS3 } from "../../utils/s3Uploader.js";

export const createIndustryController = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const existingIndustry = await findIndustryByName(name);
  if (existingIndustry) {
    return next(createError(409, "Industry with this name already exists"));
  }

  const industry_image = req.file;
  let imageUrl = null;

  if (industry_image) {
    const uploadResult = await s3Uploader(industry_image);
    if (!uploadResult.success) {
      return next(
        createError(
          500,
          `Error uploading industry_image: ${uploadResult.error}`
        )
      );
    }
    imageUrl = uploadResult.url;
  }

  const industryData = {
    name: req.body.name,
    visibility: req.body.visibility,
    industry_image: imageUrl,
  };

  const industry = await createIndustry(industryData);

  return res.status(201).json({
    success: true,
    message: "Industry created successfully",
    data: industryDto(industry),
  });
});

export const updateIndustryController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (name) {
    const existingIndustry = await findIndustryByName(name);
    if (existingIndustry && existingIndustry._id.toString() !== id) {
      return next(createError(409, "Industry with this name already exists"));
    }
  }
  let imageUrl;
  let oldIndustry = null;
  if (req.file) {
    // Find old industry to get previous image
    oldIndustry = await findIndustryById(id);
    const uploadResult = await s3Uploader(req.file);
    if (!uploadResult.success) {
      return next(
        createError(
          500,
          `Error uploading industry_image: ${uploadResult.error}`
        )
      );
    }
    imageUrl = uploadResult.url;
  }
  const updateData = {
    ...req.body,
  };

  if (imageUrl) {
    updateData.industry_image = imageUrl;
  }

  const industry = await findIndustryByIdAndUpdate(id, updateData);

  // Remove old image from S3 if a new image was uploaded
  if (imageUrl && oldIndustry && oldIndustry.industry_image) {
    await deleteFromS3(oldIndustry.industry_image);
  }

  if (!industry) {
    return next(createError(404, "Industry not found"));
  }

  return res.status(200).json({
    success: true,
    message: "Industry updated successfully",
    data: industryDto(industry),
  });
});

export const deleteIndustryController = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const equipmentCount = await countEquipmentsByIndustry(id);
  if (equipmentCount > 0) {
    return next(
      createError(400, "Cannot delete industry with associated equipment")
    );
  }

  // Find industry before deleting to get image URL
  const industry = await findIndustryById(id);
  if (!industry) {
    return next(createError(404, "Industry not found"));
  }

  // Remove industry image from S3 if exists
  if (industry.industry_image) {
    await deleteFromS3(industry.industry_image);
  }

  await findIndustryByIdAndDelete(id);

  await reorderAllIndustries();

  return res.status(200).json({
    success: true,
    message: "Industry deleted successfully",
  });
});

export const getAdminIndustriesController = catchAsync(async (req, res) => {
  const industries = await findAllIndustries();

  return res.status(200).json({
    success: true,
    message: "All industries fetched successfully",
    data: industriesDto(industries),
  });
});

export const getVisibleIndustriesController = catchAsync(async (req, res) => {
  const industries = await findVisibleIndustries();

  return res.status(200).json({
    success: true,
    message: "Visible industries fetched successfully",
    data: industriesDto(industries),
  });
});

export const createEquipmentController = catchAsync(async (req, res, next) => {
  const { name, industry_id, maxProducts } = req.body;

  const industry = await findIndustryById(industry_id);
  if (!industry) {
    return next(createError(404, "Industry not found"));
  }

  const existingEquipment = await findEquipmentByName(name);
  if (existingEquipment) {
    return next(createError(409, "Equipment with this name already exists"));
  }

  const equipmentData = {
    ...req.body,
    maxProducts: typeof maxProducts !== "undefined" ? maxProducts : 3,
  };

  const equipment = await createEquipment(equipmentData);
  return res.status(201).json({
    success: true,
    message: "Equipment created successfully",
    data: equipmentDto(equipment),
  });
});

export const updateEquipmentController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, industry: industryId, maxProducts } = req.body;

  if (industryId) {
    const industry = await findIndustryById(industryId);
    if (!industry) {
      return next(createError(404, "Industry not found"));
    }
  }

  if (name) {
    const existingEquipment = await findEquipmentByName(name);
    if (existingEquipment && existingEquipment._id.toString() !== id) {
      return next(createError(409, "Equipment with this name already exists"));
    }
  }

  // Check if maxProducts is being decremented below assigned products
  if (typeof maxProducts !== "undefined") {
    const assignedProducts = await countProductsByEquipment(id);
    if (maxProducts < assignedProducts) {
      return next(
        createError(
          400,
          `Cannot set maxProducts to ${maxProducts} because there are already ${assignedProducts} products assigned`
        )
      );
    }
  }

  const updateData = {
    ...req.body,
  };

  if (typeof maxProducts !== "undefined") {
    updateData.maxProducts = maxProducts;
  }

  const equipment = await findEquipmentByIdAndUpdate(id, updateData);
  if (!equipment) {
    return next(createError(404, "Equipment not found"));
  }

  return res.status(200).json({
    success: true,
    message: "Equipment updated successfully",
    data: equipmentDto(equipment),
  });
});

export const deleteEquipmentController = catchAsync(async (req, res, next) => {
  const equipmentId = req.params.id;

  // Use the service to count products assigned to this equipment
  const productCount = await countProductsByEquipment(equipmentId);
  if (productCount > 0) {
    return next(
      createError(400, "Cannot delete equipment with assigned products")
    );
  }

  const equipment = await findEquipmentByIdAndDelete(equipmentId);
  if (!equipment) {
    return next(createError(404, "Equipment not found"));
  }

  await reorderAllEquipments(equipment.industry_id);

  return res.status(200).json({
    success: true,
    message: "Equipment deleted successfully",
  });
});

export const getAdminEquipmentsController = catchAsync(async (req, res) => {
  const equipments = await findAllEquipments();
  return res.status(200).json({
    success: true,
    message: "All equipments fetched successfully",
    data: equipmentsDto(equipments),
  });
});

export const getVisibleEquipmentsController = catchAsync(
  async (req, res, next) => {
    const { industry } = req.query;
    let industryData = null;
    let equipments = [];

    if (industry) {
      industryData = await findIndustryByName(industry);
      if (!industryData) {
        return next(
          createError(404, `Industry with name '${industry}' not found`)
        );
      }
      if (!industryData.visibility) {
        return next(createError(403, `Industry '${industry}' is not visible`));
      }
      equipments = await findVisibleEquipments(industryData._id);
    } else {
      equipments = await findVisibleEquipments();
    }

    return res.status(200).json({
      success: true,
      message: industry
        ? `Equipments for industry '${industry}' fetched successfully`
        : "All visible equipments fetched successfully",
      data: {
        industry: industryData ? industryDto(industryData) : null,
        equipments: equipmentsDto(equipments),
      },
    });
  }
);

export const isEquipmentExistController = catchAsync(async (req, res, next) => {
  const { industry, equipment } = req.query;

  if (!industry || !equipment) {
    return next(
      createError(400, "Both industry and equipment names are required")
    );
  }
  const industryData = await findIndustryByName(industry);
  if (!industryData) {
    return next(createError(404, `Industry '${industry}' not found`));
  }
  const equipmentData = await findEquipmentByName(equipment);
  if (!equipmentData) {
    return next(createError(404, `Equipment '${equipment}' not found`));
  }
  const exists =
    equipmentData.industry_id?.toString() === industryData._id.toString();
  if (!exists) {
    return next(
      createError(
        404,
        `Equipment '${equipment}' does not exist under industry '${industry}'`
      )
    );
  }
  return res.status(200).json({
    success: true,
    exists: true,
    message: `Equipment '${equipment}' exists under industry '${industry}'`,
    data: equipmentDto(equipmentData),
  });
});

export const reorderIndustriesController = async (req, res) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ message: "Invalid input" });
  }
  try {
    await reorderIndustries(orderedIds);
    res.status(200).json({ message: "Industries reordered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to reorder industries", error: error.message });
  }
};

export const reorderEquipmentsController = async (req, res) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ message: "Invalid input" });
  }
  try {
    await reorderEquipments(orderedIds);
    res.status(200).json({ message: "Equipments reordered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to reorder equipments", error: error.message });
  }
};

export const getEquipmentEndingMessageAndToneController = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const equipment = await findEquipmentById(id);
    if (!equipment) {
      return next(createError(404, "Equipment not found"));
    }
    return res.status(200).json({
      success: true,
      data: {
        endingMessage: equipment.endingMessage,
        tone: equipment.tone,
      },
    });
  }
);
