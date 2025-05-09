const productRepo = require('../repositories/productRepository');
const { Op } = require('sequelize');

exports.getProducts = async (queryParams) => {
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 10;
  const offset = (page - 1) * limit;

  const { search, category, minPrice, maxPrice, rating } = queryParams;

  let where = {};

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  if (category) {
    where.category = category;
  }

  if (minPrice && maxPrice) {
    where.price = { [Op.between]: [minPrice, maxPrice] };
  } else if (minPrice) {
    where.price = { [Op.gte]: minPrice };
  } else if (maxPrice) {
    where.price = { [Op.lte]: maxPrice };
  }

  if (rating) {
    where.rating = { [Op.gte]: rating };
  }

  const { count, rows } = await productRepo.findAndCountProducts(where, limit, offset);

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    products: rows,
  };
};

exports.createProduct = async (productData) => {
  const { name, price } = productData;

  if (!name || !price) {
    const error = new Error('Name and price are required.');
    error.statusCode = 400;
    throw error;
  }

  return await productRepo.createProduct(productData);
};

exports.getProductById = async (id) => {
  const product = await productRepo.findProductById(id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  return product;
};
