const cartRepo = require('../repositories/cartRepository');

/**
 * Add multiple items to the user's cart.
 * @param {number} userId - The ID of the user.
 * @param {Array<{productId: number, quantity: number}>} items - Items to add.
 * @returns {Promise<Array>} The updated cart items.
 */
exports.addMultipleToCart = async (userId, items) => {
  const results = [];
  for (const { productId, quantity } of items) {
    const [item, created] = await cartRepo.findOrCreateCartItem(
      userId,
      productId,
      quantity
    );

    if (!created) {
      const updatedItem = await cartRepo.incrementCartItemQuantity(
        item,
        quantity
      );
      results.push(updatedItem);
    } else {
      results.push(item);
    }
  }

  return results;
};

/**
 * Get all items in the user's cart.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array>} The cart items.
 */
exports.getCartItems = async (userId) => {
  return await cartRepo.findAllCartItems(userId);
};

/**
 * Update the quantity of a cart item.
 * @param {number} userId - The ID of the user.
 * @param {number} productId - The ID of the product.
 * @param {number} quantity - The new quantity.
 * @returns {Promise<Object>} The updated cart item.
 * @throws {Error} If item is not found in cart.
 */
exports.updateCartItem = async (userId, productId, quantity) => {
  const item = await cartRepo.findCartItem(userId, productId);
  if (!item) throw new Error('Item not found in cart');

  return await cartRepo.updateCartItemQuantity(item, quantity);
};

/**
 * Remove an item from the user's cart.
 * @param {number} userId - The ID of the user.
 * @param {number} productId - The ID of the product.
 * @returns {Promise<void>}
 * @throws {Error} If item is not found in cart.
 */
exports.removeCartItem = async (userId, productId) => {
  const deleted = await cartRepo.deleteCartItem(userId, productId);
  if (!deleted) throw new Error('Item not found in cart');
};

/**
 * Clear all items from the user's cart.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<void>}
 */
exports.clearCart = async (userId) => {
  await cartRepo.clearCartItems(userId);
};
