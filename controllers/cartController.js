const cartService = require('../services/cartService');
const STATUS = require('../utils/statusCodes');
const logger = require('../utils/logger'); // <-- Add this line

exports.addToCart = async (req, res) => {
  const items = req.body.items; // expect array of { productId, quantity }

  if (!Array.isArray(items) || items.length === 0) {
    logger.warn('Add to cart failed: Items array is required');
    return res
      .status(STATUS.BAD_REQUEST)
      .json({ message: 'Items array is required' });
  }

  try {
    const result = await cartService.addMultipleToCart(req.user.id, items);
    res.status(STATUS.CREATED).json(result);
  } catch (err) {
    logger.error('Error adding to cart: %s', err.message);
    res.status(STATUS.SERVER_ERROR).json({ message: err.message }); // 500
  }
};

exports.getCart = async (req, res) => {
  try {
    const items = await cartService.getCartItems(req.user.id);
    res.status(STATUS.OK).json(items);
  } catch (err) {
    logger.error('Error fetching cart: %s', err.message);
    res.status(STATUS.SERVER_ERROR).json({ message: err.message }); // 500
  }
};

exports.updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const updated = await cartService.updateCartItem(
      req.user.id,
      productId,
      quantity
    );
    res.status(STATUS.OK).json(updated);
  } catch (err) {
    logger.error('Error updating cart item: %s', err.message);
    res.status(STATUS.SERVER_ERROR).json({ message: err.message }); // 500
  }
};

exports.removeCartItem = async (req, res) => {
  const { productId } = req.params;

  try {
    await cartService.removeCartItem(req.user.id, productId);
    res.status(STATUS.NO_CONTENT).send();
  } catch (err) {
    logger.error('Error removing cart item: %s', err.message);
    res.status(STATUS.SERVER_ERROR).json({ message: err.message }); // 500
  }
};

exports.clearCart = async (req, res) => {
  try {
    await cartService.clearCart(req.user.id);
    res.status(STATUS.NO_CONTENT).send();
  } catch (err) {
    logger.error('Error clearing cart: %s', err.message);
    res.status(STATUS.SERVER_ERROR).json({ message: err.message }); // 500
  }
};
