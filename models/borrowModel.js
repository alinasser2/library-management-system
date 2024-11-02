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
    userId: {
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

  // Hook to set defaults before creating a new borrow entry
  Borrow.beforeCreate((borrow) => {
    borrow.id = ulid();
    borrow.borrowDate = new Date();
  });

  // Hook to update timestamps before updating an entry
  Borrow.beforeUpdate((borrow) => {
    borrow.updated_at = new Date();
  });

  // Associations
  Borrow.associate = (models) => {
    // A Borrow belongs to a Book
    Borrow.belongsTo(models.Book, {
      foreignKey: 'bookId', // This is the key in the Borrow model
      as: 'book',           // Alias for the association
      onDelete: 'CASCADE',  // If a book is deleted, delete the associated borrows
      onUpdate: 'CASCADE',  // If a book is updated, update the associated borrows
    });

    // A Borrow belongs to a User
    Borrow.belongsTo(models.User, {
      foreignKey: 'userId', // This is the key in the Borrow model
      as: 'user',           // Alias for the association
      onDelete: 'CASCADE',  // If a user is deleted, delete the associated borrows
      onUpdate: 'CASCADE',  // If a user is updated, update the associated borrows
    });
  };

  return Borrow;
};
