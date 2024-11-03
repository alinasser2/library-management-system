const { DataTypes } = require('sequelize');
const { ulid } = require('ulid');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
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
    role: {
      type: DataTypes.ENUM('borrower', 'admin'),
      allowNull: false,
      defaultValue: 'borrower',
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
  });
  
  User.beforeUpdate((user) => {
    user.updated_at = new Date();
  });

  // Return the model
  return User;
}
