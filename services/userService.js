const userRepository = require('../repositories/userRepository');
const NotFoundError = require('../exceptions/NotFoundError');
const DuplicateEntryError = require('../exceptions/DuplicateEntryError');

class UserService {
  async listAllUsers() {
    return await userRepository.findAll();
  }

  async getUser(id) {
    return await userRepository.findById(id);
  }

  async addUser(userData) {
    return await userRepository.create(userData);
  }

  async updateUser(id, userData) {
    const user = await userRepository.findById(id);
    return await userRepository.update(user, userData);
  }

  async deleteUser(id) {
    return await userRepository.delete(id);
  }
}

module.exports = new UserService();
