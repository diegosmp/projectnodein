require('dotenv').config()
const { Sequelize } = require('sequelize')

const { DATABASE, USER, PASSWORD, HOST } = process.env

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
})

module.exports = sequelize
