const userAddressService = require('../services/userAddressService');
const STATUS = require('../utils/statusCodes');

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

    res.status(STATUS.CREATED).json(address); // 201 Created
  } catch (err) {
    const status =
      err.message === 'User not found' ? STATUS.NOT_FOUND : STATUS.SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};

exports.getUserAddresses = async (req, res) => {
  const { userId } = req.params;

  try {
    const addresses = await userAddressService.getAddressesByUser(userId);
    res.status(STATUS.OK).json(addresses); // 200 OK
  } catch {
    res.status(STATUS.SERVER_ERROR).json({ error: 'Internal server error' }); // 500
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

    res.status(STATUS.OK).json(updated); // 200 OK
  } catch (err) {
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
    res.status(STATUS.OK).json(result); // 200 OK
  } catch (err) {
    const status =
      err.message === 'Address not found'
        ? STATUS.NOT_FOUND
        : STATUS.SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};
