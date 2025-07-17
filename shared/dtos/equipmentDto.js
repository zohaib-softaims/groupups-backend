export const equipmentDto = (equipment) => {
  return {
    id: equipment._id,
    name: equipment.name,
    visibility: equipment.visibility,
    productsVisibility: equipment.productsVisibility,
    industry_id: equipment.industry_id,
    maxProducts: equipment.maxProducts,
    createdAt: equipment.createdAt,
    updatedAt: equipment.updatedAt,
  };
};

export const equipmentsDto = (equipments) => {
  return equipments.map(equipmentDto);
};
