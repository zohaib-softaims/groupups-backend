export const productDto = (product) => {
  return {
    id: product._id,
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price,
    why_good_fit_reason: product.why_good_fit_reason,
    equipment_id: product.equipment_id,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

export const productsDto = (products) => {
  return products.map((product) => productDto(product));
};
