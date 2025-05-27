const productRepo = require('../repositories/productRepository');
const { Op } = require('sequelize');
const { ALLOWED_CATEGORIES } = require('../utils/constants');

/**
 * Get a paginated list of products with optional filters.
 * @param {Object} queryParams - Query parameters for filtering and pagination.
 * @param {string} [queryParams.search] - Search term for name/description.
 * @param {string} [queryParams.category] - Category filter.
 * @param {number} [queryParams.minPrice] - Minimum price filter.
 * @param {number} [queryParams.maxPrice] - Maximum price filter.
 * @param {number} [queryParams.rating] - Minimum rating filter.
 * @param {number} [queryParams.page] - Page number for pagination.
 * @param {number} [queryParams.limit] - Items per page.
 * @returns {Promise<Object>} Paginated products and meta info.
 */
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

  const { count, rows } = await productRepo.findAndCountProducts(
    where,
    limit,
    offset
  );

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    products: rows,
  };
};

/**
 * Create a new product.
 * @param {Object} productData - The product data.
 * @param {string} productData.name - Name of the product.
 * @param {number} productData.price - Price of the product.
 * @param {string} productData.category - Category of the product.
 * @returns {Promise<Object>} The created product.
 * @throws {Error} If required fields are missing or category is invalid.
 */
exports.createProduct = async (productData) => {
  const { name, price, category } = productData;

  if (!name || !price) {
    const error = new Error('Name and price are required.');
    error.statusCode = 400;
    throw error;
  }

  if (category && !ALLOWED_CATEGORIES.includes(category.toLowerCase())) {
    const error = new Error(
      `Invalid category. Allowed categories are: ${ALLOWED_CATEGORIES.join(', ')}.`
    );
    error.statusCode = 400;
    throw error;
  }

  return await productRepo.createProduct(productData);
};

/**
 * Get a product by its ID.
 * @param {number|string} id - The product ID.
 * @returns {Promise<Object>} The product object.
 * @throws {Error} If product is not found.
 */
exports.getProductById = async (id) => {
  const product = await productRepo.findProductById(id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  return product;
};
