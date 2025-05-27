const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');
const validateRequest = require('../middlewares/validateRequest');

router.use(authMiddleware);

router.post('/', validateRequest('addToCart'), cartController.addToCart);
router.get('/', cartController.getCart);
router.put(
  '/:productId',
  validateRequest('updateCartItem'),
  cartController.updateCartItem
);
router.delete('/:productId', cartController.removeCartItem);
router.delete('/', cartController.clearCart);

module.exports = router;
