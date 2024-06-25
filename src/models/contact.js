const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class Contact extends Model {}

Contact.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  linkPrecedence: {
    type: DataTypes.ENUM('primary', 'secondary'),
    defaultValue: 'primary',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'Contact',
});

module.exports = Contact;
