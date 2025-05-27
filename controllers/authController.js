const { sendOTPService, verifyOTPService } = require('../services/authService');
const STATUS = require('../utils/statusCodes');
const logger = require('../utils/logger');

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await sendOTPService(email);
    res.status(STATUS.OK).json(result);
  } catch (error) {
    logger.error('Error sending OTP: %s', error.message);
    res.status(STATUS.SERVER_ERROR).json({ message: 'Failed to send OTP' }); // 500
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const result = await verifyOTPService(email, otp);
    res.status(STATUS.OK).json(result);
  } catch (error) {
    logger.warn('OTP verification failed: %s', error.message);
    res.status(STATUS.UNAUTHORIZED).json({ message: error.message }); // 401
  }
};
