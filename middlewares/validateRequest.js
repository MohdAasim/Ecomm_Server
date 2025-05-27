const Joi = require('joi');
const STATUS = require('../utils/statusCodes');

// Define schemas for each route/action
const schemas = {
  // Product
  createProduct: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().max(500).optional(),
    category: Joi.string().required(),
    image_url: Joi.string().uri().optional(),
  }),

  // User Address
  createAddress: Joi.object({
    userId: Joi.number().integer().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
  }),
  updateAddress: Joi.object({
    userId: Joi.number().integer().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
  }),
  deleteAddress: Joi.object({
    userId: Joi.number().integer().required(),
  }),

  // Cart
  addToCart: Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.number().integer().required(),
          quantity: Joi.number().integer().min(1).required(),
        })
      )
      .min(1)
      .required(),
  }),
  updateCartItem: Joi.object({
    quantity: Joi.number().integer().min(1).required(),
  }),

  // Auth
  sendOTP: Joi.object({
    email: Joi.string().email().required(),
  }),
  verifyOTP: Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
  }),
};

// Middleware factory
const validateRequest =
  (schemaName, property = 'body') =>
  (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) return next();

    const { error } = schema.validate(req[property]);
    if (error) {
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: error.details[0].message });
    }
    next();
  };

module.exports = validateRequest;
