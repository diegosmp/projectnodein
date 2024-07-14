const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Products = sequelize.define('Products', {
  _id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
})

module.exports = Products
