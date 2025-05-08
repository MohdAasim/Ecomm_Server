// controllers/authController.js
const { sendOTPService,verifyOTPService } = require('../services/authService');

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await sendOTPService(email);
    res.json(result);
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};


exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const result = await verifyOTPService(email, otp);
    res.json(result);
  } catch (error) {
    console.error("OTP verification failed:", error.message);
    res.status(401).json({ message: error.message });
  }
};

