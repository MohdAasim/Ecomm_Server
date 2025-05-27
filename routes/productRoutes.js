const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
} = require('../controllers/productController');
const validateRequest = require('../middlewares/validateRequest');

router.get('/', getAllProducts);
router.post('/', validateRequest('createProduct'), createProduct);
router.get('/:id', getProductById);

module.exports = router;
