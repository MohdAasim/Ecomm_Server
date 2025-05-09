const  User  = require('../models/User');

exports.findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

exports.createUser = async (email) => {
  return await User.create({ email });
};

exports.updateUserOTP = async (user, otp, otpExpiresAt) => {
  return await user.update({ otp, otpExpiresAt });
};

exports.clearUserOTP = async (user) => {
  return await user.update({ otp: null, otpExpiresAt: null });
};
