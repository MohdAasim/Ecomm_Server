const userAddressService = require('../services/userAddressService');
const STATUS = require('../utils/statusCodes');
const logger = require('../utils/logger');

exports.createAddress = async (req, res) => {
  const { userId, street, city, state, postalCode, country } = req.body;

  try {
    const address = await userAddressService.createAddress(userId, {
      street,
      city,
      state,
      postalCode,
      country,
    });

    res.status(STATUS.CREATED).json(address);
  } catch (err) {
    logger.error('Error creating address: %s', err.message);
    const status =
      err.message === 'User not found' ? STATUS.NOT_FOUND : STATUS.SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};

exports.getUserAddresses = async (req, res) => {
  const { userId } = req.params;

  try {
    const addresses = await userAddressService.getAddressesByUser(userId);
    res.status(STATUS.OK).json(addresses);
  } catch (err) {
    logger.error('Error fetching user addresses: %s', err.message);
    res.status(STATUS.SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

exports.updateAddress = async (req, res) => {
  const { addressId } = req.params;
  const { userId, street, city, state, postalCode, country } = req.body;

  try {
    const updated = await userAddressService.updateAddress(addressId, userId, {
      street,
      city,
      state,
      postalCode,
      country,
    });

    res.status(STATUS.OK).json(updated);
  } catch (err) {
    logger.error('Error updating address: %s', err.message);
    const status =
      err.message === 'Address not found'
        ? STATUS.NOT_FOUND
        : STATUS.SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  const { addressId } = req.params;
  const { userId } = req.body;

  try {
    const result = await userAddressService.deleteAddress(addressId, userId);
    res.status(STATUS.OK).json(result);
  } catch (err) {
    logger.error('Error deleting address: %s', err.message);
    const status =
      err.message === 'Address not found'
        ? STATUS.NOT_FOUND
        : STATUS.SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};
