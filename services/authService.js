const userRepo = require('../repositories/userRepository');
const { sendEmail } = require('../utils/mailer');
const { generateToken } = require('../utils/jwt.utils');

/**
 * Generate a 6-digit OTP as a string.
 * @returns {string} The generated OTP.
 */
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/**
 * Send an OTP to the user's email. Creates the user if not exists.
 * @param {string} email - The user's email address.
 * @returns {Promise<Object>} Message indicating OTP was sent.
 */
exports.sendOTPService = async (email) => {
  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

  let user = await userRepo.findUserByEmail(email);
  if (!user) {
    user = await userRepo.createUser(email);
  }

  await userRepo.updateUserOTP(user, otp, otpExpiresAt);

  await sendEmail({
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 2 minutes.`,
  });

  return { message: 'OTP sent to email' };
};

/**
 * Verify the OTP for a user and return a JWT token if valid.
 * @param {string} email - The user's email address.
 * @param {string} otp - The OTP to verify.
 * @returns {Promise<Object>} Message, JWT token, and userId if successful.
 * @throws {Error} If OTP is invalid or expired.
 */
exports.verifyOTPService = async (email, otp) => {
  const user = await userRepo.findUserByEmail(email);
  const userId = user?.id;
  if (!user || user.otp !== otp || new Date() > user.otpExpiresAt) {
    throw new Error('Invalid or expired OTP');
  }

  await userRepo.clearUserOTP(user);

  const token = generateToken({ id: user.id, email: user.email });

  return { message: 'Login successful', token, userId };
};
