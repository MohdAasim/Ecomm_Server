const User = require('../models/User');
const { sendEmail } = require('../utils/mailer');
const { generateToken } = require('../utils/jwt.utils');

exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOTPService = async (email) => {
  const otp = this.generateOTP();
  const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000);

  let user = await User.findOne({ where: { email } });
  if (!user) {
    user = await User.create({ email });
  }

  await user.update({ otp, otpExpiresAt });

  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It is valid for 2 minutes.`,
  });

  return { message: "OTP sent to email" };
};

exports.verifyOTPService = async (email, otp) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.otp !== otp || new Date() > user.otpExpiresAt) {
    throw new Error("Invalid or expired OTP");
  }

  await user.update({ otp: null, otpExpiresAt: null });

  const token = generateToken({ id: user.id, email: user.email });

  return { message: "Login successful", token };
};

