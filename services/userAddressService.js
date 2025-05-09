const addressRepo = require('../repositories/userAddressRepository');

exports.createAddress = async (userId, addressData) => {
  const user = await addressRepo.findUserById(userId);
  if (!user) throw new Error('User not found');

  return await addressRepo.createAddress(userId, addressData);
};

exports.getAddressesByUser = async (userId) => {
  return await addressRepo.findAddressesByUser(userId);
};

exports.updateAddress = async (addressId, userId, newData) => {
  const address = await addressRepo.findAddressByIdAndUser(addressId, userId);
  if (!address) throw new Error('Address not found');

  return await addressRepo.updateAddress(address, newData);
};

exports.deleteAddress = async (addressId, userId) => {
  const address = await addressRepo.findAddressByIdAndUser(addressId, userId);
  if (!address) throw new Error('Address not found');

  await addressRepo.deleteAddress(address);
  return { message: 'Address deleted successfully' };
};
