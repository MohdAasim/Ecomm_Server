// routes/auth.js
const express = require('express');
const { sendOTP, verifyOTP } = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/sendOtp', validateRequest('sendOTP'), sendOTP);
router.post('/verifyOtp', validateRequest('verifyOTP'), verifyOTP);

module.exports = router;
