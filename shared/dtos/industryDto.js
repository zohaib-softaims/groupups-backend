export const industryDto = (industry) => {
  return {
    id: industry._id,
    name: industry.name,
    visibility: industry.visibility,
    industry_image: industry.industry_image,
    createdAt: industry.createdAt,
    updatedAt: industry.updatedAt,
  };
};

export const industriesDto = (industries) => {
  return industries.map(industryDto);
};
