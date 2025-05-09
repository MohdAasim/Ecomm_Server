// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  
    console.error(err.stack); // Log the error stack (only in dev)
  
    const statusCode = err.statusCode || 500;
  
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
      // optionally include stack in dev
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  };
  