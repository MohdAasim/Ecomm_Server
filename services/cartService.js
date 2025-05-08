const CartItem = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (userId, productId, quantity = 1) => {
  const [item, created] = await CartItem.findOrCreate({
    where: { userId, productId },
    defaults: { quantity }
  });

  if (!created) {
    item.quantity += quantity;
    await item.save();
  }

  return item;
};

exports.getCartItems = async (userId) => {
  return CartItem.findAll({
    where: { userId },
    include: [{ model: Product }]
  });
};

exports.updateCartItem = async (userId, productId, quantity) => {
  const item = await CartItem.findOne({ where: { userId, productId } });
  if (!item) throw new Error('Item not found in cart');
  item.quantity = quantity;
  await item.save();
  return item;
};

exports.removeCartItem = async (userId, productId) => {
  const deleted = await CartItem.destroy({ where: { userId, productId } });
  if (!deleted) throw new Error('Item not found in cart');
};

exports.clearCart = async (userId) => {
  await CartItem.destroy({ where: { userId } });
};
