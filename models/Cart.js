const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');
const User = require('./User');
const Product = require('./Product');

const CartItem = sequelize.define('CartItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
});

User.hasMany(CartItem, { foreignKey: 'userId', as: 'cartItems' });
CartItem.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(CartItem, { foreignKey: 'productId', as: 'productCartItems' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = CartItem;
