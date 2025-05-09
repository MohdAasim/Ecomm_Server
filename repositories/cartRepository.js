const CartItem = require('../models/Cart');
const Product = require('../models/Product');

exports.findOrCreateCartItem = async (userId, productId, quantity) => {
  return await CartItem.findOrCreate({
    where: { userId, productId },
    defaults: { quantity },
  });
};

exports.findCartItem = async (userId, productId) => {
  return await CartItem.findOne({ where: { userId, productId } });
};

exports.findAllCartItems = async (userId) => {
  return await CartItem.findAll({
    where: { userId },
    include: [{ model: Product }],
  });
};

exports.updateCartItemQuantity = async (item, quantity) => {
  item.quantity = quantity;
  return await item.save();
};

exports.incrementCartItemQuantity = async (item, quantity) => {
  item.quantity += quantity;
  return await item.save();
};

exports.deleteCartItem = async (userId, productId) => {
  return await CartItem.destroy({ where: { userId, productId } });
};

exports.clearCartItems = async (userId) => {
  return await CartItem.destroy({ where: { userId } });
};
