const { sendOTPService, verifyOTPService } = require('../services/authService');
const STATUS = require('../utils/statusCodes');

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await sendOTPService(email);
    res.status(STATUS.OK).json(result); // 200 OK
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(STATUS.SERVER_ERROR).json({ message: 'Failed to send OTP' }); // 500
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const result = await verifyOTPService(email, otp);
    res.status(STATUS.OK).json(result); // 200 OK
  } catch (error) {
    console.error('OTP verification failed:', error.message);
    res.status(STATUS.UNAUTHORIZED).json({ message: error.message }); // 401
  }
};
