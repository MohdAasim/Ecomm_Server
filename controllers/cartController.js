const cartService = require('../services/cartService');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const item = await cartService.addToCart(req.user.id, productId, quantity);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const items = await cartService.getCartItems(req.user.id);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const updated = await cartService.updateCartItem(req.user.id, productId, quantity);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const { productId } = req.params;
  try {
    await cartService.removeCartItem(req.user.id, productId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await cartService.clearCart(req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
