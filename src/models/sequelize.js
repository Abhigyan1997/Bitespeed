const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bitespeed', 'root', 'mysql password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
