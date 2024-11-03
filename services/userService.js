const userRepository = require('../repositories/userRepository');
const CustomException = require('../exceptions/CustomException');

class UserService {
  async listAllUsers() {
    return await userRepository.findAll();
  }

  async getUser(id) {
    return await userRepository.findById(id);
  }

  async addUser(userData) {
    await this.isEmailUnique(userData.email);
    return await userRepository.create(userData);
  }


  async updateUser(id, userData) {
    const user = await this.validateUserExists(id);
    if (userData.email) {
      await this.isEmailUnique(userData.email);
    }
    return await userRepository.update(user, userData);
  }

  async validateUserExists(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new CustomException('User not found');
    }
    return user;
  }

  async deleteUser(id) {
    await this.validateUserExists(id);
    return await userRepository.delete(id);
  }


  async isEmailUnique(email) {
    const user = await userRepository.findByEmail(email);
    if (user) {
      throw new CustomException('Email already exists');
    }
    return user;
  }
}

module.exports = new UserService();
