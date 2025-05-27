const addressRepo = require('../repositories/userAddressRepository');

/**
 * Create a new address for a user.
 * @param {number} userId - The ID of the user.
 * @param {Object} addressData - The address details.
 * @returns {Promise<Object>} The created address.
 * @throws {Error} If user is not found.
 */
exports.createAddress = async (userId, addressData) => {
  const user = await addressRepo.findUserById(userId);
  if (!user) throw new Error('User not found');

  return await addressRepo.createAddress(userId, addressData);
};

/**
 * Get all addresses for a user.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array>} List of addresses.
 */
exports.getAddressesByUser = async (userId) => {
  return await addressRepo.findAddressesByUser(userId);
};

/**
 * Update an address for a user.
 * @param {number} addressId - The ID of the address.
 * @param {number} userId - The ID of the user.
 * @param {Object} newData - The new address data.
 * @returns {Promise<Object>} The updated address.
 * @throws {Error} If address is not found.
 */
exports.updateAddress = async (addressId, userId, newData) => {
  const address = await addressRepo.findAddressByIdAndUser(addressId, userId);
  if (!address) throw new Error('Address not found');

  return await addressRepo.updateAddress(address, newData);
};

/**
 * Delete an address for a user.
 * @param {number} addressId - The ID of the address.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Object>} Success message.
 * @throws {Error} If address is not found.
 */
exports.deleteAddress = async (addressId, userId) => {
  const address = await addressRepo.findAddressByIdAndUser(addressId, userId);
  if (!address) throw new Error('Address not found');

  await addressRepo.deleteAddress(address);
  return { message: 'Address deleted successfully' };
};
