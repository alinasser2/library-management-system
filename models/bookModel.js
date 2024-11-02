const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { ulid } = require('ulid');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: ulid,
    index: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ISBN: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    index: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
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

Book.beforeCreate((book) => {
  book.id = ulid();
});
Book.beforeUpdate((book) => {
  book.updated_at = new Date();
});

module.exports = Book;
