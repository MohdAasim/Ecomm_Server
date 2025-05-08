const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

router.use(authMiddleware);

router.post('/', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('/:productId', cartController.updateCartItem);
router.delete('/:productId', cartController.removeCartItem);
router.delete('/', cartController.clearCart);

module.exports = router;
