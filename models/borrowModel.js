const { DataTypes } = require('sequelize');
const { ulid } = require('ulid');

module.exports = (sequelize) => {
  const Borrow = sequelize.define('Borrow', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => ulid(),
    },
    bookId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borrowerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
    },
  }, {
    timestamps: true,
    paranoid: true,    
    underscored: true,
  });

  Borrow.beforeCreate((borrow) => {
    borrow.id = ulid();
    borrow.borrowDate = new Date();
  });

  return Borrow;
};
