const { User } = require('../models')

class UserRepository {
  async findAll() {
    return User.findAll();
  }

  async findById(id) {
    return User.findByPk(id);
  }

  async create(userData) {
    return User.create(userData);
  }

  async update(user, userData) {
    return user.update(userData);
  }

  async delete(id) {
    return User.destroy({ where: { id } });
  }

  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }
}

module.exports = new UserRepository();
