const { DataTypes } = require('sequelize');
const { ulid } = require('ulid');

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: ulid,
      index: true,
      defaultValue: ulid,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
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
    availableQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
  });

  Book.beforeCreate((book) => {
    book.created_at = new Date();
    book.updated_at = new Date();
  });

  Book.beforeUpdate((book) => {
    book.updated_at = new Date();
  });

  return Book;
};
