const { DataTypes } = require('sequelize');
const { ulid } = require('ulid');

module.exports = (sequelize) => {
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
    underscored: true, // This setting ensures that Sequelize uses snake_case for createdAt and updatedAt
  });

  Borrower.beforeCreate((borrower) => {
    borrower.id = ulid();
  });
  
  Borrower.beforeUpdate((borrower) => {
    borrower.updated_at = new Date();
  });

  // Return the model
  return Borrower;
}
