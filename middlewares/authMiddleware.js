const jwt = require('jsonwebtoken');
const STATUS = require('../utils/statusCodes');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(STATUS.UNAUTHORIZED)
      .json({ message: 'No token provided' }); // 401
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(STATUS.UNAUTHORIZED).json({ message: 'Malformed token' }); // 401
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res
      .status(STATUS.FORBIDDEN)
      .json({ message: 'Invalid or expired token' }); // 403
  }
};
