const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { ulid } = require('ulid');

const Borrower = sequelize.define('Borrower', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: ulid,
    index: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  paranoid: true,
});

Borrower.beforeCreate((borrower) => {
  borrower.id = ulid();
});
Borrower.beforeUpdate((borrower) => {
  borrower.updated_at = new Date();
});

module.exports = Borrower;
