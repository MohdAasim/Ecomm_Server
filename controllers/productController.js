const productService = require('../services/productService');
const STATUS = require('../utils/statusCodes');
const logger = require('../utils/logger');

// Controller to handle the request for all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);
    res.status(STATUS.OK).json(products);
  } catch (err) {
    logger.error('Error fetching products: %s', err.message);
    res.status(STATUS.SERVER_ERROR).json({ error: 'Failed to fetch products' }); // 500
  }
};

// Controller to handle the request for adding products
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(STATUS.CREATED).json({
      message: 'Product created successfully',
      product: newProduct,
    }); // 201 Created
  } catch (error) {
    logger.error('Error creating product: %s', error.message);
    const status = error.statusCode || STATUS.SERVER_ERROR;
    res.status(status).json({ message: error.message });
  }
};

// Controller to handle the request for a single product
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    res.status(STATUS.OK).json({ product });
  } catch (error) {
    logger.error('Error fetching product by ID: %s', error.message);
    const status = error.statusCode || STATUS.SERVER_ERROR;
    res.status(status).json({ message: error.message });
  }
};
