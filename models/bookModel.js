const { DataTypes } = require('sequelize');
const { ulid } = require('ulid');

module.exports = (sequelize) => {
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
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });

  Book.beforeCreate((book) => {
    book.id = ulid();
  });
  Book.beforeUpdate((book) => {
    book.updated_at = new Date();
  });

  return Book;
};
