const { Op } = require('sequelize');
const Product = require('../models/Product');

exports.findAndCountProducts = async (filters, limit, offset) => {
  return await Product.findAndCountAll({
    where: filters,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });
};

exports.createProduct = async (data) => {
  return await Product.create(data);
};

exports.findProductById = async (id) => {
  return await Product.findByPk(id);
};
