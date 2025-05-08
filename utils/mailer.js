const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Gmail", // or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async ({ to, subject, text }) => {
  try {
    await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error('Email send failed:', error);
    throw error; // Optional: rethrow or handle differently
  }
};
