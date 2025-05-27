const express = require('express');
const router = express.Router();
const userAddressController = require('../controllers/userAddressController');
const validateRequest = require('../middlewares/validateRequest');

router.post(
  '/',
  validateRequest('createAddress'),
  userAddressController.createAddress
);
router.get('/:userId', userAddressController.getUserAddresses);
router.put(
  '/:addressId',
  validateRequest('updateAddress'),
  userAddressController.updateAddress
);
router.delete(
  '/:addressId',
  validateRequest('deleteAddress'),
  userAddressController.deleteAddress
);

module.exports = router;
