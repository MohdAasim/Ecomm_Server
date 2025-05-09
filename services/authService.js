const userRepo = require('../repositories/userRepository');
const { sendEmail } = require('../utils/mailer');
const { generateToken } = require('../utils/jwt.utils');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

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
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It is valid for 2 minutes.`,
  });

  return { message: "OTP sent to email" };
};

exports.verifyOTPService = async (email, otp) => {
  const user = await userRepo.findUserByEmail(email);

  if (!user || user.otp !== otp || new Date() > user.otpExpiresAt) {
    throw new Error("Invalid or expired OTP");
  }

  await userRepo.clearUserOTP(user);

  const token = generateToken({ id: user.id, email: user.email });

  return { message: "Login successful", token };
};
