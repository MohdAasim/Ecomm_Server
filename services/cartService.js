const cartRepo = require('../repositories/cartRepository');

exports.addToCart = async (userId, productId, quantity = 1) => {
  const [item, created] = await cartRepo.findOrCreateCartItem(userId, productId, quantity);

  if (!created) {
    return await cartRepo.incrementCartItemQuantity(item, quantity);
  }

  return item;
};

exports.getCartItems = async (userId) => {
  return await cartRepo.findAllCartItems(userId);
};

exports.updateCartItem = async (userId, productId, quantity) => {
  const item = await cartRepo.findCartItem(userId, productId);
  if (!item) throw new Error('Item not found in cart');

  return await cartRepo.updateCartItemQuantity(item, quantity);
};

exports.removeCartItem = async (userId, productId) => {
  const deleted = await cartRepo.deleteCartItem(userId, productId);
  if (!deleted) throw new Error('Item not found in cart');
};

exports.clearCart = async (userId) => {
  await cartRepo.clearCartItems(userId);
};
