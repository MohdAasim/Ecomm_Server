const { User, UserAddress } = require('../models/associations');

exports.findUserById = async (userId) => {
  return await User.findByPk(userId);
};

exports.createAddress = async (userId, addressData) => {
  return await UserAddress.create({ userId, ...addressData });
};

exports.findAddressesByUser = async (userId) => {
  return await UserAddress.findAll({ where: { userId } });
};

exports.findAddressByIdAndUser = async (addressId, userId) => {
  return await UserAddress.findOne({ where: { id: addressId, userId } });
};

exports.updateAddress = async (address, newData) => {
  return await address.update(newData);
};

exports.deleteAddress = async (address) => {
  return await address.destroy();
};
