const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Book = require('./book');
const Borrower = require('./borrowerModel');

const Borrow = sequelize.define('Borrow', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => ulid(),
  },
  borrow_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
  paranoid: true,
});

// Many-to-Many Associations
Book.belongsToMany(Borrower, { through: Borrow, as: 'borrowers' });
Borrower.belongsToMany(Book, { through: Borrow, as: 'books' });

module.exports = Borrow;
